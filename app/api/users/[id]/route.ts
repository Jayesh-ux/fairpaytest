import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

/**
 * GET /api/users/[id]
 * Fetch user details, including their tickets, for the admin view.
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const currentUser = await getCurrentUser();

        if (!currentUser || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                tickets: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        _count: {
                            select: {
                                messages: true,
                                documents: true,
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        tickets: true,
                        chatMessages: true,
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user details' },
            { status: 500 }
        );
    }
}
