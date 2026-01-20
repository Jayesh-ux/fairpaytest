import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET /api/tickets/[id] - Get ticket with events, docs, messages
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

        const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true,
                        createdAt: true,
                    },
                },
                events: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                    include: {
                        createdBy: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
                documents: {
                    orderBy: { uploadedAt: 'desc' },
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    take: 50,
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
                },
            },
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Check access - users can only see their own tickets
        const userIsAdmin = await isAdmin();
        if (ticket.userId !== user.id && !userIsAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return NextResponse.json(
            { error: 'Failed to fetch ticket' },
            { status: 500 }
        );
    }
}

// PATCH /api/tickets/[id] - Update ticket (stage, status, notes)
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

        const ticket = await prisma.ticket.findUnique({
            where: { id },
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Check access
        const userIsAdmin = await isAdmin();
        if (ticket.userId !== user.id && !userIsAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { stage, status, stagePercent, overallPercent, loanAmount, lenderName, settledAmount } = body;

        // Build update data
        const updateData: any = {};

        // Only admins can update stage and status
        if (userIsAdmin) {
            if (stage) updateData.stage = stage;
            if (status) updateData.status = status;
            if (stagePercent !== undefined) updateData.stagePercent = parseInt(stagePercent);
            if (overallPercent !== undefined) updateData.overallPercent = parseInt(overallPercent);
            if (settledAmount !== undefined) {
                updateData.settledAmount = parseFloat(settledAmount);
                updateData.settledAt = new Date();
            }
        }

        // Both user and admin can update loan details
        if (loanAmount !== undefined) updateData.loanAmount = parseFloat(loanAmount);
        if (lenderName !== undefined) updateData.lenderName = lenderName;

        const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true,
                        createdAt: true,
                    },
                },
                events: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        createdBy: {
                            select: { name: true }
                        }
                    }
                },
                documents: {
                    orderBy: { uploadedAt: 'desc' },
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
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
                },
            },
        });

        // Create event for stage change
        if (stage && stage !== ticket.stage) {
            await prisma.ticketEvent.create({
                data: {
                    ticketId: ticket.id,
                    type: 'STAGE_CHANGE',
                    message: `Stage updated from ${ticket.stage} to ${stage}`,
                    createdById: user.id,
                },
            });
        }

        // Create event for status change
        if (status && status !== ticket.status) {
            await prisma.ticketEvent.create({
                data: {
                    ticketId: ticket.id,
                    type: 'STATUS_CHANGE',
                    message: `Status changed from ${ticket.status} to ${status}`,
                    createdById: user.id,
                },
            });
        }

        return NextResponse.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to update ticket' },
            { status: 500 }
        );
    }
}

// DELETE /api/tickets/[id] - Delete ticket (admin only)
export async function DELETE(
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

        await prisma.ticket.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return NextResponse.json(
            { error: 'Failed to delete ticket' },
            { status: 500 }
        );
    }
}
