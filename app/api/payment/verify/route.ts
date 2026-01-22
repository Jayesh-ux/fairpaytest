import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, contactId } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !contactId) {
            return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
        }

        // 1. Verify Signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 });
        }

        // 2. Update DB Status to PAID
        const updatedContact = await prisma.emergencyContact.update({
            where: { id: contactId },
            data: {
                status: 'PENDING', // Ready for admin action
                paymentStatus: 'PAID',
                paymentId: razorpay_payment_id,
            },
        });

        return NextResponse.json({ success: true, contact: updatedContact });

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
