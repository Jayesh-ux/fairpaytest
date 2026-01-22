'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Ticket,
    FileCheck,
    Clock,
    TrendingUp,
    Plus,
    ArrowRight,
    Calendar,
    AlertCircle,
    ShieldCheck,
    User as UserIcon,
    ChevronRight,
    MessageSquare,
    FileText,
    Phone,
    Sparkles,
    Activity,
    Bell,
    CheckCircle2,
    ArrowUpRight,
    Zap,
    Target,
    BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const stageInfo = {
    ASSESSMENT: { label: 'Assessment', color: 'bg-blue-500', step: 1, textColor: 'text-blue-500' },
    REVIEW: { label: 'Review', color: 'bg-amber-500', step: 2, textColor: 'text-amber-500' },
    STRATEGY: { label: 'Strategy', color: 'bg-purple-500', step: 3, textColor: 'text-purple-500' },
    NEGOTIATION: { label: 'Negotiation', color: 'bg-emerald-500', step: 4, textColor: 'text-emerald-500' },
    SETTLEMENT: { label: 'Settlement', color: 'bg-green-500', step: 5, textColor: 'text-green-500' },
};

interface TicketData {
    id: string;
    lenderName: string | null;
    loanType: string;
    loanAmount: number | null;
    stage: string;
    status: string;
    overallPercent: number;
    updatedAt: string;
    _count?: {
        events: number;
        documents: number;
        messages: number;
    };
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function PortalDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.role === 'ADMIN') {
            router.push('/admin');
        }
        fetchTickets();
    }, [session, router]);

    const fetchTickets = async () => {
        try {
            const res = await fetch('/api/tickets?limit=5');
            if (res.ok) {
                const data = await res.json();
                setTickets(data.tickets || []);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats from tickets
    const stats = {
        totalTickets: tickets.length,
        pendingDocuments: tickets.reduce((acc, t) => acc + (t._count?.documents || 0), 0),
        activeNegotiations: tickets.filter((t) => t.stage === 'NEGOTIATION').length,
        totalAmount: tickets.reduce((acc, t) => acc + (t.loanAmount || 0), 0),
        averageProgress: tickets.length > 0
            ? Math.round(tickets.reduce((acc, t) => acc + t.overallPercent, 0) / tickets.length)
            : 0,
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 xs:space-y-5 sm:space-y-6 max-w-6xl 3xl:max-w-[1400px] 4xl:max-w-[1600px] mx-auto overflow-hidden"
        >
            {/* Welcome Hero Section */}
            <motion.div variants={item}>
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
                    <CardContent className="p-3 xs:p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 xs:gap-4 sm:gap-6">
                            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                                <div className="relative">
                                    <Avatar className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 xs:border-4 border-background shadow-xl">
                                        <AvatarImage src={session?.user?.image || ''} />
                                        <AvatarFallback className="bg-primary text-lg xs:text-xl sm:text-2xl font-bold">
                                            {session?.user?.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-2 xs:border-4 border-background flex items-center justify-center">
                                        <CheckCircle2 className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 text-white" />
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground flex items-center gap-1 xs:gap-2">
                                        {getGreeting()}
                                        <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-amber-500" />
                                    </p>
                                    <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold truncate">
                                        {session?.user?.name?.split(' ')[0] || 'Guest'}
                                    </h1>
                                    <Badge variant="secondary" className={cn(
                                        "mt-1 xs:mt-2 rounded-full px-2 xs:px-3 py-0.5 xs:py-1 flex items-center gap-1 xs:gap-1.5 border-none text-[10px] xs:text-xs font-semibold w-fit",
                                        session?.user?.role === 'ADMIN'
                                            ? "bg-primary text-white"
                                            : "bg-primary/10 text-primary"
                                    )}>
                                        {session?.user?.role === 'ADMIN' ? (
                                            <>
                                                <ShieldCheck className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                                                Admin Access
                                            </>
                                        ) : (
                                            <>
                                                <UserIcon className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                                                Client Portal
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </div>
                            <Button size="sm" className="w-full sm:w-auto gap-1.5 xs:gap-2 rounded-full shadow-lg shadow-primary/20 text-xs xs:text-sm" asChild>
                                <Link href="/portal/tickets/new">
                                    <Plus className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                                    New Case
                                </Link>
                            </Button>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 xs:w-48 sm:w-64 h-32 xs:h-48 sm:h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-16 xs:w-24 sm:w-32 h-16 xs:h-24 sm:h-32 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Overall Progress */}
            {tickets.length > 0 && (
                <motion.div variants={item}>
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-3 xs:p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-2 xs:mb-3 sm:mb-4 gap-2">
                                <div className="flex items-center gap-2 xs:gap-3 min-w-0">
                                    <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Target className="w-4 h-4 xs:w-5 xs:h-5 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-xs xs:text-sm sm:text-base truncate">Journey Progress</h3>
                                        <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground hidden xs:block">Average across all cases</p>
                                    </div>
                                </div>
                                <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary flex-shrink-0">{stats.averageProgress}%</span>
                            </div>
                            <Progress value={stats.averageProgress} className="h-2 xs:h-2.5 sm:h-3" />
                            <div className="flex justify-between mt-2 xs:mt-3 text-[8px] xs:text-[10px] sm:text-xs text-muted-foreground">
                                <span>Started</span>
                                <span className="hidden xs:inline">Assessment</span>
                                <span>Negotiation</span>
                                <span>Settled</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Stats Grid - Bento Style */}
            <motion.div variants={item} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
                {[
                    {
                        label: 'Active Cases',
                        value: stats.totalTickets,
                        icon: Ticket,
                        gradient: 'from-blue-500 to-cyan-400',
                        bgColor: 'bg-blue-500/10',
                        iconColor: 'text-blue-500',
                    },
                    {
                        label: 'Documents',
                        value: stats.pendingDocuments,
                        icon: FileText,
                        gradient: 'from-amber-500 to-orange-400',
                        bgColor: 'bg-amber-500/10',
                        iconColor: 'text-amber-500',
                    },
                    {
                        label: 'In Negotiation',
                        value: stats.activeNegotiations,
                        icon: Activity,
                        gradient: 'from-purple-500 to-pink-400',
                        bgColor: 'bg-purple-500/10',
                        iconColor: 'text-purple-500',
                    },
                    {
                        label: 'Total Amount',
                        value: stats.totalAmount > 0 ? `₹${(stats.totalAmount / 100000).toFixed(1)}L` : '₹0',
                        icon: TrendingUp,
                        gradient: 'from-emerald-500 to-teal-400',
                        bgColor: 'bg-emerald-500/10',
                        iconColor: 'text-emerald-500',
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 group">
                            <CardContent className="p-2.5 xs:p-3 sm:p-4 lg:p-5">
                                <div className={cn("w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg xs:rounded-xl flex items-center justify-center mb-2 xs:mb-3 transition-transform group-hover:scale-110", stat.bgColor)}>
                                    <stat.icon className={cn("w-4 h-4 xs:w-5 xs:h-5 lg:w-6 lg:h-6", stat.iconColor)} />
                                </div>
                                <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold truncate">{stat.value}</p>
                                <p className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5 xs:mt-1 truncate">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                {/* Tickets List */}
                <motion.div variants={item} className="lg:col-span-2">
                    <Card className="border-border/50 h-full">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    Your Cases
                                </CardTitle>
                                <CardDescription>Track your debt resolution journey</CardDescription>
                            </div>
                            <Link
                                href="/portal/tickets"
                                className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
                            >
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </CardHeader>

                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Clock className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-muted-foreground">Loading your cases...</p>
                                </div>
                            ) : tickets.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                        <Ticket className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">No cases yet</h3>
                                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                        Start your debt resolution journey by creating your first case.
                                    </p>
                                    <Button asChild className="gap-2 rounded-full">
                                        <Link href="/portal/tickets/new">
                                            <Plus className="w-4 h-4" />
                                            Create Your First Case
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="divide-y divide-border/50">
                                    <AnimatePresence>
                                        {tickets.map((ticket, idx) => {
                                            const stage = stageInfo[ticket.stage as keyof typeof stageInfo];
                                            return (
                                                <motion.div
                                                    key={ticket.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                >
                                                    <Link
                                                        href={`/portal/tickets/${ticket.id}`}
                                                        className="block p-4 lg:p-5 hover:bg-muted/50 transition-colors group"
                                                    >
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-semibold truncate">
                                                                        {ticket.lenderName || ticket.loanType}
                                                                    </h4>
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className={cn(
                                                                            'rounded-full px-2 py-0.5 text-xs font-medium text-white border-none',
                                                                            stage?.color
                                                                        )}
                                                                    >
                                                                        {stage?.label}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground mb-3">
                                                                    {ticket.loanType.replace(/_/g, ' ')}
                                                                    {ticket.loanAmount && (
                                                                        <> • ₹{ticket.loanAmount.toLocaleString('en-IN')}</>
                                                                    )}
                                                                </p>

                                                                {/* Progress Bar */}
                                                                <div className="space-y-1.5">
                                                                    <div className="flex justify-between text-xs">
                                                                        <span className="text-muted-foreground">Progress</span>
                                                                        <span className="font-semibold text-primary">{ticket.overallPercent}%</span>
                                                                    </div>
                                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                                        <motion.div
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${ticket.overallPercent}%` }}
                                                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions Sidebar */}
                <motion.div variants={item} className="space-y-4">
                    {/* Quick Actions Card */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {[
                                { label: 'New Case', desc: 'Start debt resolution', icon: Plus, href: '/portal/tickets/new', primary: true },
                                { label: 'Documents', desc: 'Upload required files', icon: FileCheck, href: '/portal/documents' },
                                { label: 'Messages', desc: 'Chat with advisor', icon: MessageSquare, href: '/portal/messages' },
                                { label: 'Profile', desc: 'Account settings', icon: UserIcon, href: '/portal/profile' },
                            ].map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.href}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl transition-all group",
                                        action.primary
                                            ? "bg-primary/10 hover:bg-primary/20"
                                            : "hover:bg-muted/50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        action.primary ? "bg-primary" : "bg-muted"
                                    )}>
                                        <action.icon className={cn("w-5 h-5", action.primary ? "text-white" : "text-primary")} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm">{action.label}</p>
                                        <p className="text-xs text-muted-foreground">{action.desc}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-hidden relative">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Need Help?</h4>
                                    <p className="text-xs text-muted-foreground">Expert advisors available</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Our team is here to guide you through every step of your debt resolution journey.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 rounded-full" asChild>
                                    <Link href="/portal/messages">Message</Link>
                                </Button>
                                <Button size="sm" className="flex-1 rounded-full" asChild>
                                    <a href="tel:+919389815277">Call Now</a>
                                </Button>
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                    </Card>

                    {/* Notification Preview */}
                    <Card className="border-border/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Bell className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">Stay Updated</p>
                                    <p className="text-xs text-muted-foreground">We'll notify you of case updates</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
