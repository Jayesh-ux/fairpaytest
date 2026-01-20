import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// PATCH /api/reviews/[id] - Approve/Reject review
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { approved } = await request.json();

        const review = await prisma.review.update({
            where: { id: params.id },
            data: { approved },
        });

        return NextResponse.json({ success: true, review });
    } catch (error) {
        console.error('Error updating review:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update review' },
            { status: 500 }
        );
    }
}

// DELETE /api/reviews/[id] - Delete review
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.review.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting review:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete review' },
            { status: 500 }
        );
    }
}
