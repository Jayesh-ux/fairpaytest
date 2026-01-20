import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/reviews - Get all approved reviews (public)
export async function GET(request: NextRequest) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50, // Limit to 50 reviews
        });

        return NextResponse.json({
            success: true,
            reviews,
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST /api/reviews - Submit a new review (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, location, text, rating } = body;

        // Validation
        if (!name || !text || !rating) {
            return NextResponse.json(
                { success: false, error: 'Name, review text, and rating are required' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Create the review (not approved by default)
        const review = await prisma.review.create({
            data: {
                name: name.trim(),
                location: location?.trim() || null,
                text: text.trim(),
                rating: parseInt(rating),
                approved: false, // Needs admin approval
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Review submitted successfully! It will appear after moderation.',
            review: {
                id: review.id,
                name: review.name,
                location: review.location,
                rating: review.rating,
            },
        });
    } catch (error) {
        console.error('Error submitting review:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit review' },
            { status: 500 }
        );
    }
}
