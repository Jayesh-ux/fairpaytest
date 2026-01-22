import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma client is exported from here, need to check

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, message } = body;

        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Name and phone are required' },
                { status: 400 }
            );
        }

        const emergencyContact = await prisma.emergencyContact.create({
            data: {
                name,
                phone,
                message,
                status: 'PENDING',
            },
        });

        return NextResponse.json(emergencyContact, { status: 201 });
    } catch (error) {
        console.error('Error creating emergency contact:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
