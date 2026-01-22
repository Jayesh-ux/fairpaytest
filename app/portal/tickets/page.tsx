'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Plus,
    Search,
    ArrowRight,
    Clock,
    FileText,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stageInfo = {
    ASSESSMENT: { label: 'Assessment', color: 'bg-blue-500', step: 1 },
    REVIEW: { label: 'Review', color: 'bg-amber-500', step: 2 },
    STRATEGY: { label: 'Strategy', color: 'bg-purple-500', step: 3 },
    NEGOTIATION: { label: 'Negotiation', color: 'bg-emerald-500', step: 4 },
    SETTLEMENT: { label: 'Settlement', color: 'bg-green-500', step: 5 },
};

const statusColors = {
    OPEN: 'bg-green-500/10 text-green-600 border-green-200',
    ON_HOLD: 'bg-amber-500/10 text-amber-600 border-amber-200',
    COMPLETED: 'bg-blue-500/10 text-blue-600 border-blue-200',
    CANCELLED: 'bg-red-500/10 text-red-600 border-red-200',
};

interface Ticket {
    id: string;
    lenderName: string | null;
    loanType: string;
    loanAmount: number | null;
    stage: string;
    status: string;
    overallPercent: number;
    createdAt: string;
    updatedAt: string;
    _count: {
        events: number;
        documents: number;
        messages: number;
    };
}

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    useEffect(() => {
        fetchTickets();
    }, [statusFilter]);

    const fetchTickets = async () => {
        try {
            const params = new URLSearchParams();
            if (statusFilter) params.set('status', statusFilter);

            const res = await fetch(`/api/tickets?${params}`);
            const data = await res.json();
            setTickets(data.tickets || []);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTickets = tickets.filter((ticket) =>
        (ticket.lenderName || ticket.loanType).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-3 xs:space-y-4 sm:space-y-6 overflow-hidden max-w-6xl 3xl:max-w-[1400px] 4xl:max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 xs:gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-lg xs:text-xl sm:text-2xl 3xl:text-3xl font-bold text-foreground truncate">My Tickets</h1>
                    <p className="text-xs xs:text-sm 3xl:text-base text-muted-foreground truncate">
                        Track all your debt resolution cases
                    </p>
                </div>
                <Button asChild size="sm" className="w-full sm:w-auto text-xs xs:text-sm">
                    <Link href="/portal/tickets/new">
                        <Plus className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                        New Ticket
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 xs:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by lender or loan type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 rounded-lg xs:rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs xs:text-sm"
                    />
                </div>
                <div className="overflow-x-auto -mx-2 xs:-mx-3 px-2 xs:px-3 pb-1 scrollbar-hide">
                    <div className="flex gap-1.5 xs:gap-2 min-w-max">
                        {['All', 'OPEN', 'ON_HOLD', 'COMPLETED'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status === 'All' ? null : status)}
                                className={cn(
                                    'px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                                    (status === 'All' && !statusFilter) || statusFilter === status
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                )}
                            >
                                {status.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tickets List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredTickets.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card-strong p-12 rounded-2xl text-center"
                >
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                        No tickets found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {searchQuery
                            ? 'No tickets match your search criteria'
                            : 'Create your first ticket to start your debt resolution journey'}
                    </p>
                    <Button asChild>
                        <Link href="/portal/tickets/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Ticket
                        </Link>
                    </Button>
                </motion.div>
            ) : (
                <div className="grid gap-4 3xl:gap-6">
                    {filteredTickets.map((ticket, index) => (
                        <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/portal/tickets/${ticket.id}`}>
                                <div className="glass-card-strong p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all relative overflow-hidden">
                                    <div className="flex flex-col gap-3 xs:gap-4 relative z-10">
                                        {/* Main Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2">
                                                <h3 className="font-bold text-sm xs:text-base sm:text-lg text-foreground truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
                                                    {ticket.lenderName || ticket.loanType}
                                                </h3>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <span
                                                        className={cn(
                                                            'px-1.5 xs:px-2 sm:px-2.5 py-0.5 text-[9px] xs:text-[10px] sm:text-xs font-medium rounded-full text-white flex-shrink-0',
                                                            stageInfo[ticket.stage as keyof typeof stageInfo]?.color
                                                        )}
                                                    >
                                                        {stageInfo[ticket.stage as keyof typeof stageInfo]?.label}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            'px-1.5 xs:px-2 sm:px-2.5 py-0.5 text-[9px] xs:text-[10px] sm:text-xs font-medium rounded-full border flex-shrink-0',
                                                            statusColors[ticket.status as keyof typeof statusColors]
                                                        )}
                                                    >
                                                        {ticket.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-2 xs:mb-3 truncate">
                                                {ticket.loanType.replace(/_/g, ' ')}
                                                {ticket.loanAmount && (
                                                    <> • ₹{ticket.loanAmount.toLocaleString('en-IN')}</>
                                                )}
                                            </p>

                                            {/* Progress Bar */}
                                            <div className="max-w-md">
                                                <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground mb-1">
                                                    <span>Progress</span>
                                                    <span>{ticket.overallPercent}%</span>
                                                </div>
                                                <div className="h-1.5 xs:h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                                                        style={{ width: `${ticket.overallPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between pt-2 xs:pt-0 gap-2">
                                            <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 text-[10px] xs:text-xs sm:text-sm text-muted-foreground overflow-x-auto scrollbar-hide">
                                                <div className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                                                    <Clock className="w-3 h-3 xs:w-4 xs:h-4" />
                                                    <span>{ticket._count.events}</span>
                                                </div>
                                                <div className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                                                    <FileText className="w-3 h-3 xs:w-4 xs:h-4" />
                                                    <span>{ticket._count.documents}</span>
                                                </div>
                                                <div className="flex items-center gap-1 xs:gap-1.5 whitespace-nowrap">
                                                    <MessageSquare className="w-3 h-3 xs:w-4 xs:h-4" />
                                                    <span>{ticket._count.messages}</span>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <ArrowRight className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
