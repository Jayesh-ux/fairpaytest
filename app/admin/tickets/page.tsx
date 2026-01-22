'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Ticket,
    Search,
    Filter,

    User,
    IndianRupee,
    Clock,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    FileText,
    MessageSquare,
    ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatINR, formatDate, STAGE_NAMES } from '@/lib/ticket-helpers';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TicketData {
    id: string;
    lenderName: string | null;
    loanType: string;
    loanAmount: number | null;
    stage: string;
    status: string;
    overallPercent: number;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string | null;
        email: string | null;
        image: string | null;
    };
    _count: {
        events: number;
        documents: number;
        messages: number;
    };
}

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [stageFilter, setStageFilter] = useState('ALL');

    useEffect(() => {
        fetchTickets();
    }, [stageFilter]);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/tickets?${stageFilter !== 'ALL' ? `stage=${stageFilter}` : ''}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setTickets(data.tickets || []);
        } catch (error) {
            console.error(error);
            toast.error('Error loading tickets');
        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = tickets.filter(t =>
        (t.lenderName || '').toLowerCase().includes(search.toLowerCase()) ||
        (t.user.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (t.loanType || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl xs:text-3xl 3xl:text-4xl font-bold">Case Management</h1>
                    <p className="text-muted-foreground mt-1 text-[10px] xs:text-sm 3xl:text-base uppercase font-bold tracking-widest truncate">Master Control Panel • {tickets.length} Tickets</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-border bg-muted/50 hover:bg-muted">Export Report</Button>
                    <Button className="w-full sm:w-auto rounded-xl shadow-lg shadow-primary/20">Create Manual Ticket</Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="glass-card border-none">
                <CardContent className="p-3 xs:p-4 3xl:p-6 flex flex-col gap-3 xs:gap-4">
                    <div className="relative flex-1 min-w-0">
                        <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search client, lender..."
                            className="w-full bg-muted/30 border border-border/50 rounded-xl py-2 xs:py-2.5 sm:py-3 3xl:py-3.5 pl-9 xs:pl-10 sm:pl-12 pr-3 xs:pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-[11px] xs:text-xs sm:text-sm 3xl:text-base"
                        />
                    </div>
                    {/* Horizontal scrollable filter tabs */}
                    <div className="overflow-x-auto -mx-2 xs:-mx-4 px-2 xs:px-4 pb-1 scrollbar-hide">
                        <div className="flex gap-1.5 xs:gap-2 3xl:gap-3 min-w-max">
                            {['ALL', 'ASSESSMENT', 'REVIEW', 'STRATEGY', 'NEGOTIATION', 'SETTLEMENT'].map(stage => (
                                <button
                                    key={stage}
                                    onClick={() => setStageFilter(stage)}
                                    className={cn(
                                        "px-2.5 xs:px-3 sm:px-4 3xl:px-5 py-1.5 xs:py-2 3xl:py-2.5 rounded-lg xs:rounded-xl text-[8px] xs:text-[9px] sm:text-[10px] 3xl:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0",
                                        stageFilter === stage ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {stage === 'ALL' ? 'Everything' : stage}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-3.5 xs:gap-5 sm:gap-6 3xl:gap-8">
                {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse" />)
                ) : filteredTickets.length === 0 ? (
                    <div className="col-span-full py-24 text-center">
                        <Ticket className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <h3 className="text-xl font-bold">No cases found</h3>
                        <p className="text-muted-foreground">Adjust your filters or search terms</p>
                    </div>
                ) : (
                    filteredTickets.map(ticket => (
                        <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
                            <Card className="hover:bg-muted/30 transition-all duration-300 group overflow-hidden relative border-border/50 bg-card">
                                <CardContent className="p-0">
                                    <div className="p-3.5 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
                                        <div className="flex flex-col xs:flex-row items-start justify-between gap-3">
                                            <div className="flex items-center gap-2 xs:gap-3 min-w-0 w-full">
                                                <div className="w-9 h-9 xs:w-11 xs:h-11 rounded-xl bg-muted flex items-center justify-center border border-border/50 overflow-hidden shrink-0">
                                                    {ticket.user.image ? (
                                                        <img src={ticket.user.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5 xs:w-6 xs:h-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-bold text-base xs:text-lg truncate leading-tight">{ticket.user.name}</h3>
                                                    <p className="text-[10px] xs:text-xs text-muted-foreground truncate opacity-80">{ticket.user.email}</p>
                                                </div>
                                            </div>
                                            <Badge className={cn(
                                                "rounded-full px-2.5 py-0.5 text-[10px] whitespace-nowrap font-bold uppercase tracking-wider border",
                                                ticket.status === 'OPEN'
                                                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                            )}>
                                                {ticket.status}
                                            </Badge>
                                        </div>

                                        <div className="pt-2">
                                            <h4 className="font-bold text-sm text-primary mb-1">{ticket.lenderName || 'Multiple Lenders'}</h4>
                                            <p className="text-sm font-medium">{ticket.loanType}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Loan Amount</p>
                                                <p className="text-sm font-bold flex items-center gap-1">
                                                    <IndianRupee className="w-3 h-3" />
                                                    {ticket.loanAmount ? formatINR(ticket.loanAmount) : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Current Stage</p>
                                                <p className="text-sm font-bold text-amber-500">{STAGE_NAMES[ticket.stage as keyof typeof STAGE_NAMES]}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Journey Progress</p>
                                                <p className="text-xs font-bold">{ticket.overallPercent}%</p>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${ticket.overallPercent}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                            <div className="flex items-center gap-1"><FileText className="w-3 h-3" /> {ticket._count.documents} Docs</div>
                                            <div className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {ticket._count.messages} Msgs</div>
                                            <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(ticket.updatedAt)}</div>
                                        </div>
                                    </div>
                                </CardContent>
                                {/* Removed absolute arrow icon that caused overlap on small screens */}
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
