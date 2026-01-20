import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * Interface for storage provider to allow easy swapping (Local FS vs S3)
 */
export interface StorageProvider {
    uploadFile(file: File, folder: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}

/**
 * Local File System Storage Provider
 */
export const localStorageProvider: StorageProvider = {
    async uploadFile(file: File, folder: string): Promise<string> {
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
        const fileName = `${timestamp}-${originalName}`;

        // Ensure the path is correct relative to process.cwd()
        const relativeDir = path.join('uploads', folder);
        const uploadsDir = path.join(process.cwd(), 'public', relativeDir);

        await mkdir(uploadsDir, { recursive: true });

        const filePath = path.join(uploadsDir, fileName);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await writeFile(filePath, buffer);

        // Return the public URL
        return `/${relativeDir}/${fileName}`.replace(/\\/g, '/');
    },

    async deleteFile(fileUrl: string): Promise<void> {
        // Implementation for local deletion if needed
        console.log('Delete file requested for:', fileUrl);
    }
};

/**
 * Future S3 Provider placeholder
 */
/*
export const s3StorageProvider: StorageProvider = {
    async uploadFile(file: File, folder: string): Promise<string> {
        // AWS SDK implementation here
        return 's3-url';
    },
    async deleteFile(fileUrl: string): Promise<void> {
        // AWS SDK implementation here
    }
};
*/

// Set active provider (easy to switch later)
export const storage = localStorageProvider;
