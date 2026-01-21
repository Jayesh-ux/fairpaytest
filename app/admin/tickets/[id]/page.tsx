'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    FileText,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Download,
    Send,
    Plus,
    IndianRupee,
    Building,
    User,
    ShieldCheck,
    ChevronRight,
    Settings2,
    ExternalLink,
    Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { formatINR, formatDate, formatRelativeTime, STAGE_NAMES, STAGE_DESCRIPTIONS } from '@/lib/ticket-helpers';
import { toast } from 'sonner';

interface TicketEvent {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    createdBy?: { name: string | null };
}

interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    senderRole: 'USER' | 'ADMIN';
    createdAt: string;
    sender: { name: string | null; image: string | null };
}

interface Document {
    id: string;
    name: string;
    fileUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    uploadedAt: string;
}

interface Ticket {
    id: string;
    userId: string;
    lenderName: string | null;
    loanType: string;
    loanAmount: number | null;
    stage: string;
    status: string;
    stagePercent: number;
    overallPercent: number;
    settledAmount: number | null;
    settledAt: string | null;
    createdAt: string;
    updatedAt: string;
    user: { name: string | null; email: string | null; phone: string | null; image: string | null; createdAt: string };
    events: TicketEvent[];
    documents: Document[];
    messages: ChatMessage[];
}

const STAGES = ['ASSESSMENT', 'REVIEW', 'STRATEGY', 'NEGOTIATION', 'SETTLEMENT', 'CLOSED', 'REJECTED'];
const STATUSES = ['OPEN', 'ON_HOLD', 'COMPLETED', 'CANCELLED'];

export default function AdminTicketDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTicket();
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ticket?.messages]);

    const fetchTicket = async () => {
        try {
            const res = await fetch(`/api/tickets/${id}`);
            if (!res.ok) throw new Error('Failed to fetch ticket');
            const data = await res.json();
            setTicket(data);
        } catch (error) {
            console.error(error);
            toast.error('Error loading ticket details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTicket = async (updates: any) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/tickets/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (!res.ok) throw new Error('Failed to update ticket');

            const updatedData = await res.json();
            setTicket(prev => prev ? { ...prev, ...updatedData } : updatedData);
            toast.success('Ticket updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update ticket');
        } finally {
            setUpdating(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || updating) return;

        try {
            const res = await fetch(`/api/tickets/${id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message }),
            });

            if (!res.ok) throw new Error('Failed to send message');

            const newMessage = await res.json();
            setTicket(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
            setMessage('');
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message');
        }
    };

    const handleUpdateDocumentStatus = async (documentId: string, status: 'APPROVED' | 'REJECTED') => {
        let rejectionReason = null;
        if (status === 'REJECTED') {
            rejectionReason = prompt('Please enter the reason for rejection:');
            if (rejectionReason === null) return;
        }

        setUpdating(true);
        try {
            const res = await fetch(`/api/tickets/${id}/documents`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documentId, status, rejectionReason }),
            });

            if (!res.ok) throw new Error('Failed to update document status');

            const updatedDoc = await res.json();
            setTicket(prev => prev ? {
                ...prev,
                documents: prev.documents.map(d => d.id === documentId ? updatedDoc : d)
            } : null);
            toast.success(`Document ${status.toLowerCase()} successfully`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update document status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin" /></div>;
    if (!ticket) return <div className="text-center py-12">Ticket not found</div>;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="space-y-2 w-full overflow-hidden">
                    <Link href="/admin/tickets" className="inline-flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-3 h-3" /> Back to All Cases
                    </Link>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl font-bold truncate leading-tight">{ticket.lenderName || ticket.loanType}</h1>
                            <Badge className="w-fit bg-primary/20 text-primary border-primary/30 uppercase text-[10px] tracking-widest px-2 py-0.5">#{ticket.id.slice(0, 8)}</Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2 text-xs truncate">
                            <User className="w-3 h-3 shrink-0" /> <span className="truncate">{ticket.user.name}</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons - Stacked on mobile, Row on md */}
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-white/10 text-xs h-10" disabled={updating}>Manage Documents</Button>
                    <Button variant="destructive" className="w-full sm:w-auto rounded-xl text-xs h-10" disabled={updating}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column: Stats & Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card-strong border-none">
                        <CardHeader className="p-4 xs:p-6">
                            <CardTitle className="text-lg">Control Panel</CardTitle>
                            <CardDescription>Adjust case parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 xs:p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Case Stage</label>
                                <Select
                                    defaultValue={ticket.stage}
                                    onValueChange={(val) => handleUpdateTicket({ stage: val })}
                                    disabled={updating}
                                >
                                    <SelectTrigger className="bg-background border-white/5 rounded-xl h-10 xs:h-12 text-xs xs:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#121214] border-white/5 text-white">
                                        {STAGES.map(s => <SelectItem key={s} value={s}>{STAGE_NAMES[s as keyof typeof STAGE_NAMES]}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Case Status</label>
                                <Select
                                    defaultValue={ticket.status}
                                    onValueChange={(val) => handleUpdateTicket({ status: val })}
                                    disabled={updating}
                                >
                                    <SelectTrigger className="bg-background border-white/5 rounded-xl h-10 xs:h-12 text-xs xs:text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#121214] border-white/5 text-white">
                                        {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Settlement Amount (INR)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                                    <input
                                        type="number"
                                        placeholder="Enter final amount"
                                        defaultValue={ticket.settledAmount || ''}
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            if (val && parseFloat(val) !== ticket.settledAmount) {
                                                handleUpdateTicket({ settledAmount: val });
                                            }
                                        }}
                                        className="w-full bg-background border border-white/5 rounded-xl h-10 xs:h-12 pl-9 xs:pl-10 pr-4 text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Overall Progress</label>
                                    <span className="text-xs font-bold">{ticket.overallPercent}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    defaultValue={ticket.overallPercent}
                                    onMouseUp={(e) => handleUpdateTicket({ overallPercent: parseInt((e.target as HTMLInputElement).value) })}
                                    className="w-full accent-primary h-1.5 rounded-full appearance-none bg-white/5"
                                />
                            </div>

                            <div className="pt-4 grid grid-cols-1 xs:grid-cols-2 gap-3">
                                <Button
                                    className="rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 h-9 xs:h-10 text-[10px] xs:text-xs font-bold uppercase"
                                    onClick={() => handleUpdateTicket({ stage: 'CLOSED', status: 'COMPLETED' })}
                                    disabled={updating || ticket.stage === 'CLOSED'}
                                >
                                    Resolve Case
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-xl border-red-500/20 text-red-400 hover:bg-red-500/5 h-9 xs:h-10 text-[10px] xs:text-xs font-bold uppercase"
                                    onClick={() => handleUpdateTicket({ stage: 'REJECTED', status: 'CANCELLED' })}
                                    disabled={updating || ticket.stage === 'REJECTED'}
                                >
                                    Reject Case
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none">
                        <CardHeader className="pb-2 p-4 xs:p-6">
                            <CardTitle className="text-sm font-medium">Client Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm p-4 xs:p-6 pt-0 xs:pt-0">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-xs xs:text-sm">Phone</span>
                                <span className="font-bold text-xs xs:text-sm">{ticket.user.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-xs xs:text-sm">Registered</span>
                                <span className="font-bold text-xs xs:text-sm">{formatDate(ticket.user.createdAt || '')}</span>
                            </div>
                            <Button variant="secondary" className="w-full h-9 xs:h-10 text-xs font-bold uppercase rounded-xl" asChild>
                                <Link href={`/admin/users/${ticket.userId}`}>View Full Profile</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Interaction Hub */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="chat" className="w-full">
                        <TabsList className="bg-white/5 border border-white/5 p-1 rounded-xl w-full grid grid-cols-3 h-auto">
                            <TabsTrigger value="chat" className="rounded-lg text-[10px] xs:text-xs py-2">Chat</TabsTrigger>
                            <TabsTrigger value="events" className="rounded-lg text-[10px] xs:text-xs py-2">Timeline</TabsTrigger>
                            <TabsTrigger value="docs" className="rounded-lg text-[10px] xs:text-xs py-2">Docs</TabsTrigger>
                        </TabsList>

                        {/* Chat Hub */}
                        <TabsContent value="chat" className="mt-4">
                            <Card className="bg-[#121214] border-none h-[600px] flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                    <h3 className="font-bold">Message Client</h3>
                                    <Badge className="bg-primary/10 text-primary border-primary/20">Active Session</Badge>
                                </div>
                                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {ticket.messages.map((msg) => {
                                        const isMe = msg.senderRole === 'ADMIN';
                                        return (
                                            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                                <div className={cn(
                                                    "max-w-[85%] rounded-2xl p-4 shadow-xl",
                                                    isMe ? "bg-primary text-white rounded-tr-none" : "bg-[#1j1j20] text-white border border-white/5 rounded-tl-none"
                                                )}>
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    <div className="mt-2 flex items-center justify-between gap-4">
                                                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">
                                                            {isMe ? 'Sent by you' : msg.sender.name}
                                                        </span>
                                                        <span className="text-[9px] opacity-40">{formatRelativeTime(msg.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={chatEndRef} />
                                </CardContent>
                                <div className="p-4 bg-white/5 border-t border-white/5">
                                    <form onSubmit={handleSendMessage} className="flex gap-3">
                                        <input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type high-priority message..."
                                            className="flex-1 bg-background border border-white/5 px-6 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                        />
                                        <Button type="submit" disabled={!message.trim()} className="h-12 w-12 rounded-2xl p-0">
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </form>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Timeline */}
                        <TabsContent value="events" className="mt-4">
                            <Card className="bg-[#121214] border-none">
                                <CardHeader>
                                    <CardTitle>Case Timeline</CardTitle>
                                    <CardDescription>System and manual events</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-white/5 before:h-full ml-1">
                                        {ticket.events.map((event) => (
                                            <div key={event.id} className="relative pl-10 pb-8">
                                                <div className="absolute left-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center -translate-x-1.5 z-10 shadow-lg shadow-primary/20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                </div>
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="font-bold text-sm">{event.message}</p>
                                                        <span className="text-[9px] font-bold uppercase text-muted-foreground">{formatDate(event.createdAt)}</span>
                                                    </div>
                                                    <p className="text-[10px] text-primary/70 font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <ShieldCheck className="w-3 h-3" /> System Log
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Documents */}
                        <TabsContent value="docs" className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ticket.documents.map(doc => (
                                    <Card key={doc.id} className="bg-[#121214] border-none hover:ring-1 ring-primary/30 transition-all">
                                        <CardContent className="p-4 flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{doc.name}</p>
                                                        <Badge className={cn(
                                                            "text-[9px] uppercase font-bold",
                                                            doc.status === 'APPROVED' ? "bg-green-500/10 text-green-500" :
                                                                doc.status === 'REJECTED' ? "bg-red-500/10 text-red-500" :
                                                                    "bg-amber-500/10 text-amber-500"
                                                        )}>
                                                            {doc.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-xl" asChild>
                                                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4" /></a>
                                                </Button>
                                            </div>

                                            {doc.status === 'PENDING' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                                                        onClick={() => handleUpdateDocumentStatus(doc.id, 'APPROVED')}
                                                        disabled={updating}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex-1 bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                                                        onClick={() => handleUpdateDocumentStatus(doc.id, 'REJECTED')}
                                                        disabled={updating}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

function Loader2(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
            className={cn("animate-spin", props.className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
