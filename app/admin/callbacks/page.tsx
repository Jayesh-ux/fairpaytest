'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PhoneCall,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle,
    MoreVertical,
    Mail,
    MapPin,
    Calendar,
    Phone,
    ArrowRight,
    User,
    Trash2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatDate } from '@/lib/ticket-helpers';
import { cn } from '@/lib/utils';

interface Callback {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    city: string | null;
    preferredTime: string | null;
    source: string;
    status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'DISCARDED';
    notes: string | null;
    createdAt: string;
    handledByAdmin?: { name: string | null };
}

export default function AdminCallbacksPage() {
    const [callbacks, setCallbacks] = useState<Callback[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchCallbacks();
    }, [filter]);

    const fetchCallbacks = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/callbacks?${filter !== 'ALL' ? `status=${filter}` : ''}`);
            const data = await res.json();
            setCallbacks(data.callbacks || []);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching leads');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/callbacks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error();
            toast.success(`Lead marked as ${status}`);
            fetchCallbacks();
        } catch (error) {
            toast.error('Failed to update lead');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        try {
            const res = await fetch(`/api/callbacks/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Lead deleted');
            fetchCallbacks();
        } catch (error) {
            toast.error('Failed to delete lead');
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Callback Requests</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase font-bold tracking-widest">Leads Management • {callbacks.length} Submissions</p>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'DISCARDED'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                            filter === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse" />)
                ) : callbacks.length === 0 ? (
                    <div className="py-24 text-center">
                        <PhoneCall className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground">No callback requests found</p>
                    </div>
                ) : (
                    callbacks.map(cb => (
                        <Card key={cb.id} className="overflow-hidden hover:bg-muted/30 transition-all group border-border/50">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center border",
                                            cb.status === 'NEW' ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" :
                                                cb.status === 'CONVERTED' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                                        )}>
                                            <PhoneCall className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold">{cb.name}</h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
                                                <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cb.phone}</span>
                                                {cb.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cb.email}</span>}
                                                {cb.city && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cb.city}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-2">
                                            {cb.status === 'NEW' && (
                                                <Button size="sm" className="rounded-xl bg-emerald-600 hover:bg-emerald-700" onClick={() => handleUpdateStatus(cb.id, 'CONTACTED')}>
                                                    Mark Contacted
                                                </Button>
                                            )}
                                            {cb.status === 'CONTACTED' && (
                                                <Button size="sm" className="rounded-xl bg-primary" onClick={() => handleUpdateStatus(cb.id, 'CONVERTED')}>
                                                    Mark Converted
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="rounded-xl text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(cb.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Submitted {formatDate(cb.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">Preferred Time</p>
                                        <p className="text-sm font-bold text-primary">{cb.preferredTime || 'Anytime'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">Source</p>
                                        <p className="text-sm font-bold uppercase text-foreground/70">{cb.source}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">Status</p>
                                        <Badge className={cn(
                                            "rounded-full px-4 py-0.5 border",
                                            cb.status === 'NEW' ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" :
                                                cb.status === 'CONVERTED' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20" :
                                                    "bg-muted text-muted-foreground border-border"
                                        )}>
                                            {cb.status}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
