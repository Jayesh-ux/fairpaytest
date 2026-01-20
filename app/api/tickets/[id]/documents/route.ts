import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { storage } from '@/lib/storage';

// GET /api/tickets/[id]/documents - Get all documents for a ticket
export async function GET(
    request: NextRequest,
    context: any // Using any to handle both Promise and object params across Next versions
) {
    try {
        const params = await (context.params);
        const { id } = params;
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify access - check if ticket exists and belonging to user or admin
        const ticket = await prisma.ticket.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        const userIsAdmin = await isAdmin();
        if (ticket.userId !== user.id && !userIsAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const documents = await prisma.document.findMany({
            where: { ticketId: id },
            orderBy: { uploadedAt: 'desc' },
            include: {
                reviewedBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

// POST /api/tickets/[id]/documents - Upload document
export async function POST(
    request: NextRequest,
    context: any
) {
    try {
        const params = await (context.params);
        const { id } = params;

        console.log(`[Document Upload] Starting upload for ticket: ${id}`);

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify access
        const ticket = await prisma.ticket.findUnique({
            where: { id },
            select: { userId: true, lenderName: true, loanType: true },
        });

        if (!ticket) {
            console.error(`[Document Upload] Ticket not found: ${id}`);
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        const userIsAdmin = await isAdmin();
        if (ticket.userId !== user.id && !userIsAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const name = formData.get('name') as string | null;

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            );
        }

        console.log(`[Document Upload] Processing file: ${file.name}, size: ${file.size} bytes`);

        // Use the storage utility
        const fileUrl = await storage.uploadFile(file, `documents/${id}`);

        // Create document record
        const document = await prisma.document.create({
            data: {
                ticketId: id,
                name: name || file.name,
                fileName: file.name,
                fileUrl: fileUrl,
                mimeType: file.type,
                fileSize: file.size,
                status: 'PENDING',
            },
        });

        // Create event
        await prisma.ticketEvent.create({
            data: {
                ticketId: id,
                type: 'DOCUMENT',
                message: `Document uploaded: ${name || file.name}`,
                createdById: user.id,
            },
        });

        // Update ticket's updatedAt
        await prisma.ticket.update({
            where: { id },
            data: { updatedAt: new Date() },
        });

        console.log(`[Document Upload] Successfully uploaded: ${document.id}`);
        return NextResponse.json(document, { status: 201 });
    } catch (error: any) {
        console.error('[Document Upload] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload document' },
            { status: 500 }
        );
    }
}


// PATCH /api/tickets/[id]/documents - Update document status (admin only)
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!await isAdmin()) {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const body = await request.json();
        const { documentId, status, rejectionReason } = body;

        if (!documentId || !status) {
            return NextResponse.json(
                { error: 'Document ID and status are required' },
                { status: 400 }
            );
        }

        if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const document = await prisma.document.update({
            where: { id: documentId },
            data: {
                status,
                rejectionReason: status === 'REJECTED' ? rejectionReason : null,
                reviewedAt: new Date(),
                reviewedById: user.id,
            },
        });

        // Create event
        await prisma.ticketEvent.create({
            data: {
                ticketId: id,
                type: 'DOCUMENT',
                message: `Document "${document.name}" ${status.toLowerCase()}${status === 'REJECTED' && rejectionReason ? `: ${rejectionReason}` : ''}`,
                createdById: user.id,
            },
        });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
            { error: 'Failed to update document' },
            { status: 500 }
        );
    }
}
