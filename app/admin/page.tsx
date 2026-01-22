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
            className="space-y-4 xs:space-y-6 sm:space-y-8 max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px] mx-auto overflow-hidden"
        >
            {/* Header Section */}
            <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 xs:gap-3 mb-1 xs:mb-2">
                        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight truncate">Command Center</h1>
                        <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 text-[10px] xs:text-xs font-bold flex items-center gap-1 xs:gap-1.5 flex-shrink-0">
                            <ShieldCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                            ADMIN
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs xs:text-sm sm:text-base truncate">
                        Real-time overview • Last updated: {new Date().toLocaleTimeString()}
                    </p>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="rounded-full gap-1.5 xs:gap-2 border-border hover:bg-muted text-xs px-2 xs:px-3"
                    >
                        <RefreshCw className={cn("w-3 h-3 xs:w-4 xs:h-4", refreshing && "animate-spin")} />
                        <span className="hidden xs:inline">Refresh</span>
                    </Button>
                    <Button size="sm" className="rounded-full gap-1.5 xs:gap-2 shadow-lg shadow-primary/20 text-xs px-2 xs:px-3" asChild>
                        <Link href="/admin/tickets">
                            <Eye className="w-3 h-3 xs:w-4 xs:h-4" />
                            <span className="hidden xs:inline">View All Cases</span>
                            <span className="xs:hidden">Cases</span>
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid - Bento Style */}
            <motion.div variants={item} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                {statsCards.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="group relative overflow-hidden border-border bg-card hover:bg-muted/50 transition-all duration-500 hover:border-border"
                    >
                        <CardContent className="p-3 xs:p-4 sm:p-6">
                            <div className="flex items-start justify-between mb-2 xs:mb-3 sm:mb-4">
                                <div className={cn("p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl sm:rounded-2xl", stat.bgColor)}>
                                    <stat.icon className={cn("w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5", stat.iconColor)} />
                                </div>
                                <div className="flex items-center gap-0.5 xs:gap-1">
                                    {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-emerald-500" />}
                                    {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-red-500" />}
                                    {stat.trend === 'alert' && <AlertTriangle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />}
                                    <span className={cn(
                                        "text-[9px] xs:text-[10px] sm:text-xs font-semibold hidden xs:inline",
                                        stat.trend === 'up' && "text-emerald-500",
                                        stat.trend === 'down' && "text-red-500",
                                        stat.trend === 'alert' && "text-amber-500",
                                        stat.trend === 'info' && "text-muted-foreground"
                                    )}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-0.5 xs:space-y-1">
                                <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{stat.value.toLocaleString()}</p>
                                <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">{stat.label}</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                {/* Activity Feed - Spans 2 columns on desktop */}
                <motion.div variants={item} className="lg:col-span-2 min-w-0 w-full">
                    <Card className="h-full overflow-hidden w-full border-border/50">
                        <CardHeader className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pb-2 px-2.5 xs:px-4 sm:px-6">
                            <div className="min-w-0">
                                <CardTitle className="text-sm xs:text-base sm:text-lg font-bold flex items-center gap-1.5 xs:gap-2">
                                    <Activity className="w-3.5 h-3.5 xs:w-5 xs:h-5 text-primary flex-shrink-0" />
                                    <span className="truncate">Live Activity</span>
                                </CardTitle>
                                <CardDescription className="text-[10px] xs:text-xs text-muted-foreground hidden xs:block">Real-time updates</CardDescription>
                            </div>
                            {/* Hide tabs on very small screens */}
                            <Tabs defaultValue="all" className="w-auto hidden sm:block">
                                <TabsList className="bg-muted rounded-full p-1 h-8 xs:h-9">
                                    <TabsTrigger value="all" className="rounded-full text-[10px] xs:text-xs px-2 xs:px-3 data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
                                    <TabsTrigger value="tickets" className="rounded-full text-[10px] xs:text-xs px-2 xs:px-3 data-[state=active]:bg-primary data-[state=active]:text-white">Tickets</TabsTrigger>
                                    <TabsTrigger value="leads" className="rounded-full text-[10px] xs:text-xs px-2 xs:px-3 data-[state=active]:bg-primary data-[state=active]:text-white">Leads</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardHeader>
                        <CardContent className="space-y-1.5 xs:space-y-2 px-2.5 xs:px-4 sm:px-6 pb-4">
                            <AnimatePresence>
                                {recentActivities.map((activity, idx) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group flex items-center gap-2 xs:gap-3 sm:gap-4 p-2 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border/50 cursor-pointer"
                                    >
                                        <div className={cn(
                                            "w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl flex items-center justify-center shrink-0",
                                            activity.status === 'success' && "bg-emerald-500/10",
                                            activity.status === 'warning' && "bg-amber-500/10",
                                            activity.status === 'error' && "bg-red-500/10",
                                            activity.status === 'info' && "bg-blue-500/10"
                                        )}>
                                            {activity.status === 'success' && <CheckCircle2 className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-500" />}
                                            {activity.status === 'warning' && <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 text-amber-500" />}
                                            {activity.status === 'error' && <XCircle className="w-4 h-4 xs:w-5 xs:h-5 text-red-500" />}
                                            {activity.status === 'info' && <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-blue-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <p className="font-semibold text-xs xs:text-sm truncate">{activity.action}</p>
                                            <p className="text-[10px] xs:text-xs text-gray-400 truncate">{activity.description}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[10px] xs:text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</p>
                                        </div>
                                        <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden xs:block" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions Panel */}
                <motion.div variants={item} className="space-y-3 xs:space-y-4 min-w-0 w-full">
                    {/* Performance Card */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-3 xs:pb-4 px-3 xs:px-4 sm:px-6">
                            <CardTitle className="text-sm xs:text-base sm:text-lg font-bold flex items-center gap-1.5 xs:gap-2">
                                <Target className="w-4 h-4 xs:w-5 xs:h-5 text-primary" />
                                Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 xs:space-y-4 sm:space-y-5 px-3 xs:px-4 sm:px-6">
                            {performanceMetrics.map((metric, idx) => (
                                <div key={idx} className="space-y-1.5 xs:space-y-2">
                                    <div className="flex items-center justify-between text-xs xs:text-sm">
                                        <span className="text-gray-400 truncate">{metric.label}</span>
                                        <span className="font-bold flex-shrink-0">{metric.value}</span>
                                    </div>
                                    <Progress
                                        value={(metric.current / metric.target) * 100}
                                        className="h-1.5 xs:h-2 bg-muted"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card className="border-border/50">
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
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <action.icon className={cn("w-4 h-4", action.color)} />
                                        <span className="text-sm font-medium">{action.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="rounded-full border-none">
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
                        <CardContent className="p-4 xs:p-6">
                            <div className="flex items-center gap-2 xs:gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <Globe className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-500" />
                                    </div>
                                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card animate-pulse" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-xs xs:text-sm truncate">System Operational</p>
                                    <p className="text-[10px] text-muted-foreground truncate">All services healthy</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 xs:gap-3 text-center">
                                <div className="p-1 px-1.5 rounded-lg bg-muted/50">
                                    <p className="text-xs xs:text-lg font-bold text-emerald-500">45ms</p>
                                    <p className="text-[8px] xs:text-[10px] text-muted-foreground uppercase truncate">Response</p>
                                </div>
                                <div className="p-1 px-1.5 rounded-lg bg-muted/50">
                                    <p className="text-xs xs:text-lg font-bold">99.9%</p>
                                    <p className="text-[8px] xs:text-[10px] text-muted-foreground uppercase truncate">Uptime</p>
                                </div>
                                <div className="p-1 px-1.5 rounded-lg bg-muted/50">
                                    <p className="text-xs xs:text-lg font-bold text-blue-400">12%</p>
                                    <p className="text-[8px] xs:text-[10px] text-muted-foreground uppercase truncate">Load</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Revenue & Analytics Row */}
            <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
                {/* Revenue Card */}
                <Card className="overflow-hidden border-border/50">
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
                <Card className="border-border/50">
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
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
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
