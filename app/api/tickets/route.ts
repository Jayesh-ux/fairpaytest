import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET /api/tickets - List tickets (user's own / admin all)
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const stage = searchParams.get('stage');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Build where clause
        const where: any = {};

        // Non-admins can only see their own tickets
        if (!await isAdmin()) {
            where.userId = user.id;
        }

        if (status) {
            where.status = status;
        }
        if (stage) {
            where.stage = stage;
        }

        const [tickets, total] = await Promise.all([
            prisma.ticket.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    documents: {
                        orderBy: { uploadedAt: 'desc' },
                    },
                    _count: {
                        select: {
                            events: true,
                            documents: true,
                            messages: true,
                        },
                    },
                },
                orderBy: { updatedAt: 'desc' },
                take: limit,
                skip: offset,
            }),
            prisma.ticket.count({ where }),
        ]);

        return NextResponse.json({
            tickets,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tickets' },
            { status: 500 }
        );
    }
}

// POST /api/tickets - Create new ticket
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            lenderName,
            loanType,
            loanAmount,
            notes,
        } = body;

        // Validation
        if (!loanType) {
            return NextResponse.json(
                { error: 'Loan type is required' },
                { status: 400 }
            );
        }

        // Create ticket
        const ticket = await prisma.ticket.create({
            data: {
                userId: user.id,
                lenderName: lenderName || null,
                loanType,
                loanAmount: loanAmount ? parseFloat(loanAmount) : null,
                stage: 'ASSESSMENT',
                stagePercent: 0,
                overallPercent: 0,
                status: 'OPEN',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        // Create initial event
        await prisma.ticketEvent.create({
            data: {
                ticketId: ticket.id,
                type: 'STAGE_CHANGE',
                message: `New ticket created for ${loanType}${lenderName ? ` (${lenderName})` : ''}${loanAmount ? `. Amount: ₹${parseFloat(loanAmount).toLocaleString('en-IN')}` : ''}`,
            },
        });

        return NextResponse.json(ticket, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}
