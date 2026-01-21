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

/**
 * DELETE /api/users/[id]
 * Delete a user and all their associated data.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const currentUser = await getCurrentUser();

        if (!currentUser || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Prevent admin from deleting themselves
        if (currentUser.id === id) {
            return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
        }

        // Manually cleanup dependencies to avoid FK constraint errors

        // 1. Messages sent by user (ChatMessage.senderId has no cascade in schema)
        await prisma.chatMessage.deleteMany({ where: { senderId: id } });

        // 2. Admin references - set to null (these are optional relations)
        await prisma.ticketEvent.updateMany({
            where: { createdById: id },
            data: { createdById: null }
        });
        await prisma.document.updateMany({
            where: { reviewedById: id },
            data: { reviewedById: null }
        });
        await prisma.callbackRequest.updateMany({
            where: { handledByAdminId: id },
            data: { handledByAdminId: null }
        });
        await prisma.review.updateMany({
            where: { approvedByAdminId: id },
            data: { approvedByAdminId: null }
        });

        // 3. Delete the user
        // Ticket, Account, Session dependencies are set to Cascade in schema, so they should auto-delete.
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}
