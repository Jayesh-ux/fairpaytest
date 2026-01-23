import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        // Check for environment variables
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay keys are missing');
            return NextResponse.json(
                { error: 'Razorpay configuration missing' },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { name, phone, message } = body;

        console.log('Received payment request:', { name, phone });

        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Name and phone are required' },
                { status: 400 }
            );
        }

        // 1. Create a partial record in DB (pending payment)
        let emergencyContact;
        try {
            emergencyContact = await prisma.emergencyContact.create({
                data: {
                    name,
                    phone,
                    message,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                    amount: 200,
                },
            });
        } catch (dbError: any) {
            console.error('Database error creating EmergencyContact:', dbError);
            // If table doesn't exist or connection fails
            return NextResponse.json(
                { error: 'Database error: ' + (dbError.message || 'Unknown DB error') },
                { status: 500 }
            );
        }

        // 2. Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // 3. Create Razorpay Order
        const amountInPaise = 200 * 100; // ₹200
        let order;
        try {
            const options = {
                amount: amountInPaise,
                currency: 'INR',
                receipt: emergencyContact.id,
                payment_capture: 1, // Auto capture
            };
            order = await razorpay.orders.create(options);
        } catch (rpError: any) {
            console.error('Razorpay order creation failed:', rpError);
            return NextResponse.json(
                { error: 'Payment gateway error: ' + (rpError.description || rpError.message || 'Unknown error') },
                { status: 500 }
            );
        }

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
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        });

    } catch (error: any) {
        console.error('Unexpected error creating payment order:', error);
        return NextResponse.json(
            { error: 'Internal Server Error: ' + (error.message || 'Unknown error') },
            { status: 500 }
        );
    }
}
