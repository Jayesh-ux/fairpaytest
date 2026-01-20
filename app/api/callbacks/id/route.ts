import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// PATCH /api/callbacks/[id] - Update callback status/notes
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { status, notes } = await request.json();

        const callback = await prisma.callbackRequest.update({
            where: { id: params.id },
            data: {
                status: status || undefined,
                notes: notes || undefined,
                handledByAdminId: user.id,
            },
        });

        return NextResponse.json({ success: true, callback });
    } catch (error) {
        console.error('Error updating callback:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update callback' },
            { status: 500 }
        );
    }
}

// DELETE /api/callbacks/[id] - Delete callback
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.callbackRequest.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting callback:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete callback' },
            { status: 500 }
        );
    }
}
