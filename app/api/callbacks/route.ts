import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/callbacks - Submit a callback request (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, phone, email, city, preferredTime, source } = body;

        // Validation
        if (!name || !phone) {
            return NextResponse.json(
                { success: false, error: 'Name and phone number are required' },
                { status: 400 }
            );
        }

        // Basic phone validation (Indian phone numbers)
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = phone.replace(/\D/g, '').slice(-10);

        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { success: false, error: 'Please enter a valid 10-digit Indian phone number' },
                { status: 400 }
            );
        }

        // Create the callback request
        const callback = await prisma.callbackRequest.create({
            data: {
                name: name.trim(),
                phone: cleanPhone,
                email: email?.trim() || null,
                city: city?.trim() || null,
                preferredTime: preferredTime?.trim() || null,
                source: source || 'website',
                loanAmount: body.loanAmount || null,
                loanType: body.loanType || null,
                status: 'NEW',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Callback request submitted successfully! Our team will contact you soon.',
            id: callback.id,
        });
    } catch (error) {
        console.error('Error submitting callback request:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit callback request' },
            { status: 500 }
        );
    }
}

// GET /api/callbacks - For admin use (protected in middleware)
export async function GET(request: NextRequest) {
    try {
        // Note: This should be protected by middleware for ADMIN only
        // The middleware will handle the auth check before this runs

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};
        if (status) {
            where.status = status;
        }

        const callbacks = await prisma.callbackRequest.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
            include: {
                handledByAdmin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            callbacks,
            total: await prisma.callbackRequest.count({ where }),
        });
    } catch (error) {
        console.error('Error fetching callbacks:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch callbacks' },
            { status: 500 }
        );
    }
}
