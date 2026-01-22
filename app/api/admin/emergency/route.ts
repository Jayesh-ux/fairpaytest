import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
    const session = await auth();

    // Basic admin check - ideally we check role/email
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const contacts = await prisma.emergencyContact.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            // Ensure we fetch payment details
            select: {
                id: true,
                name: true,
                phone: true,
                message: true,
                status: true,
                paymentStatus: true,
                amount: true,
                paymentId: true,
                createdAt: true,
            }
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}
