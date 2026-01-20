import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || !(await isAdmin())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all stats in parallel
        const [
            totalTickets,
            activeTickets,
            completedTickets,
            pendingCallbacks,
            pendingReviews,
            totalReviews,
            totalUsers,
            recentTickets,
            recentCallbacks,
            recentReviews,
            stageDistribution,
        ] = await Promise.all([
            // Total tickets count
            prisma.ticket.count(),
            // Active tickets (OPEN status)
            prisma.ticket.count({ where: { status: 'OPEN' } }),
            // Completed tickets
            prisma.ticket.count({ where: { status: 'COMPLETED' } }),
            // Pending callbacks (NEW status)
            prisma.callbackRequest.count({ where: { status: 'NEW' } }),
            // Pending reviews (not approved)
            prisma.review.count({ where: { approved: false } }),
            // Total reviews
            prisma.review.count(),
            // Total users (excluding admins)
            prisma.user.count({ where: { role: 'USER' } }),
            // Recent 5 tickets with user info
            prisma.ticket.findMany({
                take: 5,
                orderBy: { updatedAt: 'desc' },
                include: {
                    user: {
                        select: { name: true, email: true },
                    },
                },
            }),
            // Recent 5 callbacks
            prisma.callbackRequest.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
            }),
            // Recent 5 reviews
            prisma.review.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
            }),
            // Stage distribution
            prisma.ticket.groupBy({
                by: ['stage'],
                _count: { stage: true },
            }),
        ]);

        // Calculate total loan amount being handled
        const loanStats = await prisma.ticket.aggregate({
            _sum: { loanAmount: true },
            where: { status: { in: ['OPEN', 'ON_HOLD'] } },
        });

        // Build stage distribution object
        const stageDistributionObj: Record<string, number> = {
            ASSESSMENT: 0,
            REVIEW: 0,
            STRATEGY: 0,
            NEGOTIATION: 0,
            SETTLEMENT: 0,
        };
        stageDistribution.forEach((item) => {
            stageDistributionObj[item.stage] = item._count.stage;
        });

        // Build recent activities from all sources
        const recentActivities = [
            ...recentTickets.map((t) => ({
                id: t.id,
                type: 'ticket' as const,
                action: t.status === 'OPEN' ? 'New Case Created' : 'Case Updated',
                description: `${t.loanType}${t.lenderName ? ` - ${t.lenderName}` : ''}${t.loanAmount ? ` • ₹${t.loanAmount.toLocaleString('en-IN')}` : ''}`,
                timestamp: t.updatedAt.toISOString(),
                status: t.status === 'COMPLETED' ? 'success' as const : 'info' as const,
                userName: t.user.name || t.user.email,
            })),
            ...recentCallbacks.map((cb) => ({
                id: cb.id,
                type: 'callback' as const,
                action: 'Callback Request',
                description: `${cb.name} - ${cb.phone}`,
                timestamp: cb.createdAt.toISOString(),
                status: cb.status === 'NEW' ? 'warning' as const : 'info' as const,
            })),
            ...recentReviews.map((r) => ({
                id: r.id,
                type: 'review' as const,
                action: r.approved ? 'Review Published' : 'Review Pending Approval',
                description: `${r.rating} stars from ${r.name}`,
                timestamp: r.createdAt.toISOString(),
                status: r.approved ? 'success' as const : 'info' as const,
            })),
        ]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10);

        return NextResponse.json({
            stats: {
                totalTickets,
                activeTickets,
                completedCases: completedTickets,
                pendingCallbacks,
                pendingReviews,
                totalReviews,
                totalUsers,
                totalLoanAmount: loanStats._sum.loanAmount || 0,
                conversionRate: totalTickets > 0
                    ? Math.round((completedTickets / totalTickets) * 100)
                    : 0,
            },
            stageDistribution: stageDistributionObj,
            recentActivities,
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
