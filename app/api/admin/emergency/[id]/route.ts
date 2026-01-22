import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { status } = body;

        const updatedContact = await prisma.emergencyContact.update({
            where: { id: params.id },
            data: { status },
        });

        return NextResponse.json(updatedContact);
    } catch (error) {
        console.error('Error updating emergency contact:', error);
        return NextResponse.json(
            { error: 'Failed to update contact' },
            { status: 500 }
        );
    }
}
