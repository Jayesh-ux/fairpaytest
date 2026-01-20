import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET /api/users - List all users (admin only)
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where: any = {};
        if (role && role !== 'ALL') {
            where.role = role;
        }

        const users = await prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                _count: {
                    select: {
                        tickets: true,
                        chatMessages: true,
                    }
                }
            }
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// PATCH /api/users/[id] - Update user (not implemented yet but placeholder for future)
// DELETE /api/users/[id] - Delete user
