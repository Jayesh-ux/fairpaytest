'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ticket,
    Users as UsersIcon,
    PhoneCall,
    Star,
    TrendingUp,
    TrendingDown,
    Clock,
    Activity,
    ShieldCheck,
    ChevronRight,
    Loader2,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    Target,
    DollarSign,
    Bell,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Calendar,
    MoreHorizontal,
    RefreshCw,
    Eye,
    MessageSquare,
    FileText,
    Globe,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Stats {
    totalTickets: number;
    activeTickets: number;
    pendingCallbacks: number;
    pendingReviews: number;
    totalUsers: number;
    completedCases: number;
    totalLoanAmount: number;
    conversionRate: number;
}

interface StageDistribution {
    ASSESSMENT: number;
    REVIEW: number;
    STRATEGY: number;
    NEGOTIATION: number;
    SETTLEMENT: number;
}

interface RecentActivity {
    id: string;
    type: 'ticket' | 'callback' | 'review' | 'user';
    action: string;
    description: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error' | 'info';
    userName?: string;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// Helper function to format relative time
const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [stageDistribution, setStageDistribution] = useState<StageDistribution | null>(null);
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            if (!res.ok) throw new Error('Failed to fetch stats');

            const data = await res.json();

            setStats(data.stats);
            setStageDistribution(data.stageDistribution);

            // Format activities with relative timestamps
            const formattedActivities = (data.recentActivities || []).map((activity: RecentActivity) => ({
                ...activity,
                timestamp: formatRelativeTime(activity.timestamp),
            }));
            setRecentActivities(formattedActivities);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin stats:', error);
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchStats();
        setRefreshing(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 animate-pulse" />
                    <Loader2 className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Initializing Dashboard</p>
                    <div className="flex items-center justify-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        );
    }

    const statsCards = [
        {
            label: 'Total Cases',
            value: stats?.totalTickets || 0,
            change: '+12%',
            trend: 'up',
            icon: Ticket,
            color: 'from-blue-500 to-cyan-400',
            bgColor: 'bg-blue-500/10',
            iconColor: 'text-blue-500',
        },
        {
            label: 'Active Clients',
            value: stats?.activeTickets || 0,
            change: '+8%',
            trend: 'up',
            icon: UsersIcon,
            color: 'from-emerald-500 to-teal-400',
            bgColor: 'bg-emerald-500/10',
            iconColor: 'text-emerald-500',
        },
        {
            label: 'Pending Leads',
            value: stats?.pendingCallbacks || 0,
            change: 'Action Required',
            trend: 'alert',
            icon: PhoneCall,
            color: 'from-amber-500 to-orange-400',
            bgColor: 'bg-amber-500/10',
            iconColor: 'text-amber-500',
        },
        {
            label: 'Reviews',
            value: stats?.pendingReviews || 0,
            change: '+3 pending',
            trend: 'info',
            icon: Star,
            color: 'from-purple-500 to-pink-400',
            bgColor: 'bg-purple-500/10',
            iconColor: 'text-purple-500',
        },
    ];

    const performanceMetrics = [
        { label: 'Conversion Rate', value: `${stats?.conversionRate || 0}%`, target: 75, current: stats?.conversionRate || 0 },
        { label: 'Cases Completed', value: stats?.completedCases || 0, target: 50, current: stats?.completedCases || 0 },
        { label: 'User Satisfaction', value: '94%', target: 95, current: 94 },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 max-w-[1600px] mx-auto"
        >
            {/* Header Section */}
            <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Command Center</h1>
                        <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            ADMIN
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-base">
                        Real-time overview of FairPay Solution operations • Last updated: {new Date().toLocaleTimeString()}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="rounded-full gap-2 border-border hover:bg-muted"
                    >
                        <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button size="sm" className="rounded-full gap-2 shadow-lg shadow-primary/20" asChild>
                        <Link href="/admin/tickets">
                            <Eye className="w-4 h-4" />
                            View All Cases
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid - Bento Style */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="group relative overflow-hidden border-border bg-card hover:bg-muted/50 transition-all duration-500 hover:border-border"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("p-3 rounded-2xl", stat.bgColor)}>
                                    <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                                </div>
                                <div className="flex items-center gap-1">
                                    {stat.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />}
                                    {stat.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
                                    {stat.trend === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                                    <span className={cn(
                                        "text-xs font-semibold",
                                        stat.trend === 'up' && "text-emerald-500",
                                        stat.trend === 'down' && "text-red-500",
                                        stat.trend === 'alert' && "text-amber-500",
                                        stat.trend === 'info' && "text-muted-foreground"
                                    )}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-4xl font-bold tracking-tight">{stat.value.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                            {/* Hover glow effect */}
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                                stat.color
                            )} />
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Main Grid - 3 Column Bento Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Activity Feed - Spans 2 columns */}
                <motion.div variants={item} className="lg:col-span-2">
                    <Card className="border-white/5 bg-[#121214] h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Live Activity Feed
                                </CardTitle>
                                <CardDescription>Real-time updates from platform</CardDescription>
                            </div>
                            <Tabs defaultValue="all" className="w-auto">
                                <TabsList className="bg-white/5 rounded-full p-1 h-9">
                                    <TabsTrigger value="all" className="rounded-full text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
                                    <TabsTrigger value="tickets" className="rounded-full text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-white">Tickets</TabsTrigger>
                                    <TabsTrigger value="leads" className="rounded-full text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-white">Leads</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <AnimatePresence>
                                {recentActivities.map((activity, idx) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 border border-transparent hover:border-white/5 cursor-pointer"
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                            activity.status === 'success' && "bg-emerald-500/10",
                                            activity.status === 'warning' && "bg-amber-500/10",
                                            activity.status === 'error' && "bg-red-500/10",
                                            activity.status === 'info' && "bg-blue-500/10"
                                        )}>
                                            {activity.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                            {activity.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                            {activity.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                                            {activity.status === 'info' && <Bell className="w-5 h-5 text-blue-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm truncate">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions Panel */}
                <motion.div variants={item} className="space-y-4">
                    {/* Performance Card */}
                    <Card className="border-white/5 bg-[#121214]">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {performanceMetrics.map((metric, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{metric.label}</span>
                                        <span className="font-bold">{metric.value}</span>
                                    </div>
                                    <Progress
                                        value={(metric.current / metric.target) * 100}
                                        className="h-2 bg-white/5"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card className="border-white/5 bg-[#121214]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {[
                                { label: 'Pending Reviews', count: stats?.pendingReviews, href: '/admin/reviews', icon: Star, color: 'text-purple-500' },
                                { label: 'Unprocessed Leads', count: stats?.pendingCallbacks, href: '/admin/callbacks', icon: PhoneCall, color: 'text-amber-500' },
                                { label: 'Active Tickets', count: stats?.activeTickets, href: '/admin/tickets', icon: Ticket, color: 'text-blue-500' },
                            ].map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.href}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <action.icon className={cn("w-4 h-4", action.color)} />
                                        <span className="text-sm font-medium">{action.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-white/5 text-white hover:bg-white/10 rounded-full border-none">
                                            {action.count}
                                        </Badge>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    {/* System Status */}
                    <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-hidden relative">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121214] animate-pulse" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">System Operational</p>
                                    <p className="text-xs text-muted-foreground">All services healthy</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="p-2 rounded-lg bg-white/5">
                                    <p className="text-lg font-bold text-emerald-500">45ms</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Response</p>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5">
                                    <p className="text-lg font-bold">99.9%</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Uptime</p>
                                </div>
                                <div className="p-2 rounded-lg bg-white/5">
                                    <p className="text-lg font-bold text-blue-400">12%</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Load</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Revenue & Analytics Row */}
            <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
                {/* Revenue Card */}
                <Card className="border-white/5 bg-[#121214] overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Loan Amount</p>
                                    <p className="text-3xl font-bold">₹{((stats?.totalLoanAmount || 0) / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none rounded-full">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +24%
                            </Badge>
                        </div>
                        <div className="h-24 flex items-end gap-1.5">
                            {[40, 65, 45, 80, 55, 70, 90, 65, 85, 75, 95, 80].map((height, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-gradient-to-t from-emerald-500/50 to-emerald-500/10 rounded-t transition-all duration-300 hover:from-emerald-500/70"
                                    style={{ height: `${height}%` }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Jan</span>
                            <span>Jun</span>
                            <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Case Distribution */}
                <Card className="border-white/5 bg-[#121214]">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Case Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { stage: 'Assessment', key: 'ASSESSMENT', color: 'bg-blue-500' },
                            { stage: 'Review', key: 'REVIEW', color: 'bg-amber-500' },
                            { stage: 'Strategy', key: 'STRATEGY', color: 'bg-purple-500' },
                            { stage: 'Negotiation', key: 'NEGOTIATION', color: 'bg-emerald-500' },
                            { stage: 'Settlement', key: 'SETTLEMENT', color: 'bg-green-500' },
                        ].map((item, idx) => {
                            const count = stageDistribution?.[item.key as keyof StageDistribution] || 0;
                            const maxCount = Math.max(...Object.values(stageDistribution || { ASSESSMENT: 1 }), 1);
                            return (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-24 text-sm text-muted-foreground">{item.stage}</div>
                                    <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(count / maxCount) * 100}%` }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            className={cn("h-full rounded-full", item.color)}
                                        />
                                    </div>
                                    <div className="w-10 text-sm font-bold text-right">{count}</div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
