'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Ticket,
    Search,
    Filter,
    ArrowRight,
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
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Case Management</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase font-bold tracking-widest">Master Control Panel • {tickets.length} Tickets</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-white/10 bg-white/5 hover:bg-white/10">Export Report</Button>
                    <Button className="w-full sm:w-auto rounded-xl shadow-lg shadow-primary/20">Create Manual Ticket</Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="glass-card border-none">
                <CardContent className="p-3 xs:p-4 flex flex-col gap-3 xs:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by client, lender, or loan type..."
                            className="w-full bg-[#121214] border-none rounded-xl py-2.5 xs:py-3 pl-10 xs:pl-12 pr-3 xs:pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-xs xs:text-sm"
                        />
                    </div>
                    {/* Horizontal scrollable filter tabs */}
                    <div className="overflow-x-auto -mx-3 xs:-mx-4 px-3 xs:px-4 pb-1 scrollbar-hide">
                        <div className="flex gap-1.5 xs:gap-2 min-w-max">
                            {['ALL', 'ASSESSMENT', 'REVIEW', 'STRATEGY', 'NEGOTIATION', 'SETTLEMENT'].map(stage => (
                                <button
                                    key={stage}
                                    onClick={() => setStageFilter(stage)}
                                    className={cn(
                                        "px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0",
                                        stageFilter === stage ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />)
                ) : filteredTickets.length === 0 ? (
                    <div className="col-span-full py-24 text-center">
                        <Ticket className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <h3 className="text-xl font-bold">No cases found</h3>
                        <p className="text-muted-foreground">Adjust your filters or search terms</p>
                    </div>
                ) : (
                    filteredTickets.map(ticket => (
                        <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
                            <Card className="bg-[#121214] border-none hover:bg-[#1a1a1c] transition-all duration-300 group overflow-hidden relative">
                                <CardContent className="p-0">
                                    <div className="p-6 space-y-4">
                                        <div className="flex flex-col xs:flex-row items-start justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 overflow-hidden flex-shrink-0">
                                                    {ticket.user.image ? (
                                                        <img src={ticket.user.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-6 h-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-lg truncate">{ticket.user.name}</h3>
                                                    <p className="text-xs text-muted-foreground truncate">{ticket.user.email}</p>
                                                </div>
                                            </div>
                                            <Badge className={cn(
                                                "rounded-full px-3 py-1 whitespace-nowrap",
                                                ticket.status === 'OPEN' ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
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
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
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
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="p-2 rounded-xl bg-primary text-white"><ArrowRight className="w-4 h-4" /></div>
                                </div>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
