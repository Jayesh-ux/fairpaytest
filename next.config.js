/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Enable SWC minification for better performance
    swcMinify: true,

    // Compiler optimizations
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Performance optimizations
    experimental: {
        optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', 'framer-motion'],
    },

    // Image optimization configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Google profile images
            },
            {
                protocol: 'https',
                hostname: '*.amazonaws.com', // Future S3 images
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // Environment variables that should be available on the client
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    },

    // Compression
    compress: true,

    // Redirects for old Vite routes if needed
    async redirects() {
        return [
            // Redirect /blog to /media (if needed)
            {
                source: '/blog',
                destination: '/media',
                permanent: true,
            },
        ];
    },

    // Custom headers for caching
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
