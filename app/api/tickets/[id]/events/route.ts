import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET /api/tickets/[id]/events - Get ticket events
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

        const events = await prisma.ticketEvent.findMany({
            where: { ticketId: id },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// POST /api/tickets/[id]/events - Add timeline event (admin only)
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

        if (!await isAdmin()) {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        const body = await request.json();
        const { type, message } = body;

        if (!type || !message) {
            return NextResponse.json(
                { error: 'Type and message are required' },
                { status: 400 }
            );
        }

        // Validate event type
        const validTypes = ['INFO', 'DOCUMENT', 'STATUS_CHANGE', 'STAGE_CHANGE'];
        if (!validTypes.includes(type)) {
            return NextResponse.json(
                { error: 'Invalid event type' },
                { status: 400 }
            );
        }

        const event = await prisma.ticketEvent.create({
            data: {
                ticketId: id,
                type,
                message,
                createdById: user.id,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        // Update ticket's updatedAt
        await prisma.ticket.update({
            where: { id },
            data: { updatedAt: new Date() },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}
