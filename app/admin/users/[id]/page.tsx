'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Calendar,
    ArrowLeft,
    ArrowRight,
    Ticket,
    MessageSquare,
    ExternalLink,
    Shield,
    FileText,
    Clock,
    CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatINR, STAGE_NAMES } from '@/lib/ticket-helpers';
import Link from 'next/link';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
    role: string;
    createdAt: string;
    tickets: any[];
    _count: {
        tickets: number;
        chatMessages: number;
    };
}

export default function UserDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
            } else {
                toast.error(data.error || 'Failed to fetch user');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold">User not found</h2>
                <Button variant="link" asChild className="mt-4">
                    <Link href="/admin/users">Back to User Management</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Users
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                            {user.image ? (
                                <img src={user.image} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-8 h-8 text-primary" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user.name || 'Anonymous'}</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <Badge variant="secondary" className="bg-white/5 border-white/10 uppercase text-[10px] font-bold tracking-widest">
                                    {user.role}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Joined {formatDate(user.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl bg-white/5 border-white/10" asChild>
                        <a href={`mailto:${user.email}`}><Mail className="w-4 h-4 mr-2" /> Email</a>
                    </Button>
                    <Button variant="default" className="rounded-xl shadow-lg shadow-primary/20">Manage Access</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Stats & Info */}
                <div className="space-y-6">
                    <Card className="glass-card border-none overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                                    <p className="text-2xl font-bold text-primary">{user._count.tickets}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Cases</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                                    <p className="text-2xl font-bold text-primary">{user._count.chatMessages}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Messages</p>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</p>
                                        <p className="text-sm truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</p>
                                        <p className="text-sm">{user.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Security & Role</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
                                <span className="text-muted-foreground">System Role</span>
                                <Badge className={cn("rounded-full uppercase text-[10px]", user.role === 'ADMIN' ? 'bg-primary' : 'bg-muted')}>
                                    {user.role}
                                </Badge>
                            </div>
                            <Button variant="outline" className="w-full rounded-xl border-red-500/20 text-red-500 hover:bg-red-500/10">
                                Suspend Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Tickets History */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="glass-card border-none bg-transparent">
                        <CardHeader className="px-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-bold">Case History</CardTitle>
                                    <CardDescription>Managed debts and financial relief records</CardDescription>
                                </div>
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-3 py-1">
                                    {user.tickets.length} Tickets
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="px-0 space-y-4">
                            {user.tickets.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                    <Ticket className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p className="text-muted-foreground">No tickets found for this user.</p>
                                </div>
                            ) : (
                                user.tickets.map((ticket: any) => (
                                    <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`} className="block">
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className="group relative p-4 xs:p-6 rounded-2xl xs:rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all shadow-sm"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                        <CreditCard className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg">{ticket.lenderName || ticket.loanType}</h4>
                                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                            <span>{ticket.loanType}</span>
                                                            <span>•</span>
                                                            <span>ID: {ticket.id.slice(0, 8)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">{ticket.overallPercent}%</p>
                                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{STAGE_NAMES[ticket.stage as keyof typeof STAGE_NAMES]}</p>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-border/50">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 text-[9px] xs:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                <span className="flex items-center gap-1.5 xs:gap-2"><MessageSquare className="w-3 h-3" /> {ticket._count.messages} Msgs</span>
                                                <span className="flex items-center gap-1.5 xs:gap-2"><FileText className="w-3 h-3" /> {ticket._count.documents} Docs</span>
                                                <span className="hidden lg:flex items-center gap-1.5 xs:gap-2"><Calendar className="w-3 h-3" /> {formatDate(ticket.createdAt)}</span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
