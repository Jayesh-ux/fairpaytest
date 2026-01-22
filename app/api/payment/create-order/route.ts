import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

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

        // 1. Create a partial record in DB (pending payment)
        // We create it first to link the payment to a record
        const emergencyContact = await prisma.emergencyContact.create({
            data: {
                name,
                phone,
                message,
                status: 'PENDING',
                paymentStatus: 'PENDING',
                amount: 200,
            },
        });

        // 2. Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // 3. Create Razorpay Order
        const amountInPaise = 200 * 100; // ₹200
        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: emergencyContact.id,
            payment_capture: 1, // Auto capture
        };

        const order = await razorpay.orders.create(options);

        // 4. Update DB with Order ID
        await prisma.emergencyContact.update({
            where: { id: emergencyContact.id },
            data: { orderId: order.id },
        });

        // 5. Return Order Details to Frontend
        return NextResponse.json({
            id: emergencyContact.id,
            orderId: order.id,
            amount: amountInPaise,
            currency: 'INR',
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error('Error creating payment order:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
