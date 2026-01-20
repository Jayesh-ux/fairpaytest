import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET /api/tickets/[id]/messages - Get chat messages
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify access
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

        const messages = await prisma.chatMessage.findMany({
            where: { ticketId: id },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });

        // Mark messages as read for the user (update readAt)
        await prisma.chatMessage.updateMany({
            where: {
                ticketId: id,
                senderId: { not: user.id },
                readAt: null,
            },
            data: { readAt: new Date() },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

// POST /api/tickets/[id]/messages - Send message
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify access
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

        const body = await request.json();
        const { content } = body;

        if (!content || !content.trim()) {
            return NextResponse.json(
                { error: 'Message content is required' },
                { status: 400 }
            );
        }

        const message = await prisma.chatMessage.create({
            data: {
                ticketId: id,
                senderId: user.id,
                senderRole: userIsAdmin ? 'ADMIN' : 'USER',
                content: content.trim(),
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true,
                    },
                },
            },
        });

        // Update ticket's updatedAt
        await prisma.ticket.update({
            where: { id },
            data: { updatedAt: new Date() },
        });

        // Create event for the message
        await prisma.ticketEvent.create({
            data: {
                ticketId: id,
                type: 'INFO',
                message: userIsAdmin
                    ? 'Advisor sent a message'
                    : 'Client sent a message',
                createdById: user.id,
            },
        });

        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
