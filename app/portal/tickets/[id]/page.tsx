'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
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
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatINR, formatDate, formatRelativeTime, STAGE_NAMES, STAGE_DESCRIPTIONS } from '@/lib/ticket-helpers';
import { toast } from 'sonner';

interface TicketEvent {
    id: string;
    type: string;
    message: string;
    createdAt: string;
    createdById?: string;
    createdBy?: {
        name: string | null;
        image: string | null;
    };
}

interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    senderRole: 'USER' | 'ADMIN';
    createdAt: string;
    sender: {
        name: string | null;
        image: string | null;
    };
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
    lenderName: string | null;
    loanType: string;
    loanAmount: number | null;
    stage: 'ASSESSMENT' | 'REVIEW' | 'STRATEGY' | 'NEGOTIATION' | 'SETTLEMENT' | 'CLOSED' | 'REJECTED';
    status: 'OPEN' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
    stagePercent: number;
    overallPercent: number;
    settledAmount: number | null;
    settledAt: string | null;
    createdAt: string;
    updatedAt: string;
    events: TicketEvent[];
    documents: Document[];
    messages: ChatMessage[];
}

const STAGES = ['ASSESSMENT', 'REVIEW', 'STRATEGY', 'NEGOTIATION', 'SETTLEMENT', 'CLOSED', 'REJECTED'] as const;

export default function TicketDetailPage() {
    const { id } = useParams();
    const { data: session } = useSession();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTicket();
    }, [id]);

    useEffect(() => {
        scrollToBottom();
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

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || sendingMessage) return;

        setSendingMessage(true);
        try {
            const res = await fetch(`/api/tickets/${id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message }),
            });

            if (!res.ok) throw new Error('Failed to send message');

            const newMessage = await res.json();
            setTicket((prev) => prev ? {
                ...prev,
                messages: [...prev.messages, newMessage]
            } : null);
            setMessage('');
            scrollToBottom();
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message');
        } finally {
            setSendingMessage(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name.split('.')[0]);

        const toastId = toast.loading('Uploading document...');

        try {
            const res = await fetch(`/api/tickets/${id}/documents`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const newDoc = await res.json();
            setTicket((prev) => prev ? {
                ...prev,
                documents: [newDoc, ...prev.documents]
            } : null);
            toast.success('Document uploaded successfully', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload document', { id: toastId });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold">Ticket not found</h2>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/portal/tickets">Back to my tickets</Link>
                </Button>
            </div>
        );
    }

    const currentStageIndex = STAGES.indexOf(ticket.stage);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                    <Link
                        href="/portal/tickets"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tickets
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            {ticket.lenderName || ticket.loanType}
                        </h1>
                        <Badge variant={ticket.status === 'OPEN' ? 'default' : 'secondary'} className="rounded-full px-3">
                            {ticket.status}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        {ticket.loanType} • ID: {ticket.id.slice(0, 8)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <a href="tel:+919389815277">
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule Update
                        </a>
                    </Button>
                </div>
            </div>

            {ticket.settledAmount && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-green-500 text-lg">Settlement Reached!</h3>
                            <p className="text-sm text-green-500/80">Great news! We've negotiated a settlement for your case.</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right bg-white/5 p-4 rounded-xl border border-green-500/20 md:min-w-[200px]">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 text-green-500">Settled Amount</p>
                        <p className="text-2xl font-bold text-green-500">{formatINR(ticket.settledAmount)}</p>
                    </div>
                </motion.div>
            )}

            {/* Progress Section */}
            <Card className="glass-card-strong border-none shadow-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <div className="space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Current Stage: {STAGE_NAMES[ticket.stage]}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                                    {STAGE_DESCRIPTIONS[ticket.stage]}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary">{ticket.overallPercent}%</span>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Overall Progress</p>
                            </div>
                        </div>

                        {/* Visual Stage Tracker */}
                        <div className="relative pt-12 pb-4 overflow-x-auto pb-12 -mx-4 px-4 xs:-mx-6 xs:px-6 md:overflow-visible md:pb-4 md:px-0 md:mx-0 scrollbar-hide">
                            <div className="min-w-[600px] md:min-w-0 relative">
                                <Progress value={ticket.overallPercent} className="h-2" />
                                <div className="absolute top-0 w-full flex justify-between">
                                    {STAGES.map((stage, idx) => {
                                        const isCompleted = idx < currentStageIndex;
                                        const isActive = idx === currentStageIndex;
                                        return (
                                            <div key={stage} className="flex flex-col items-center gap-2 -mt-2">
                                                <div
                                                    className={cn(
                                                        "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10",
                                                        isCompleted ? "bg-primary border-primary" :
                                                            isActive ? "bg-background border-primary scale-125 ring-4 ring-primary/20" :
                                                                "bg-background border-muted"
                                                    )}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                                                    ) : (
                                                        <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-primary" : "bg-muted")} />
                                                    )}
                                                </div>
                                                <span className={cn(
                                                    "text-[10px] md:text-xs font-medium absolute -bottom-8 whitespace-nowrap",
                                                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                                                )}>
                                                    {STAGE_NAMES[stage]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Information Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Loan Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-primary" />
                            <span className="text-2xl font-bold">
                                {ticket.loanAmount ? formatINR(ticket.loanAmount) : 'Not specified'}
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Lender</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-primary" />
                            <span className="text-xl font-bold">{ticket.lenderName || 'N/A'}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Created On</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="text-xl font-bold">{formatDate(ticket.createdAt)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid grid-cols-3 w-full max-w-md bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="timeline" className="rounded-lg">Timeline</TabsTrigger>
                    <TabsTrigger value="chat" className="rounded-lg">Chat</TabsTrigger>
                    <TabsTrigger value="documents" className="rounded-lg">Documents</TabsTrigger>
                </TabsList>

                {/* Timeline Tab */}
                <TabsContent value="timeline" className="mt-6">
                    <Card className="glass-card-strong border-none">
                        <CardContent className="p-6">
                            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-muted before:h-full pb-4">
                                {ticket.events.map((event, idx) => (
                                    <div key={event.id} className="relative pl-10">
                                        <div className="absolute left-0 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center -translate-x-1.5 z-10">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-foreground">{event.message}</h4>
                                                <span className="text-xs text-muted-foreground">{formatRelativeTime(event.createdAt)}</span>
                                            </div>
                                            {event.createdBy && (
                                                <p className="text-xs text-primary font-medium flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    Updated by {event.createdBy.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat" className="mt-6">
                    <Card className="glass-card-strong border-none h-[600px] flex flex-col">
                        <CardHeader className="border-b border-white/5">
                            <CardTitle className="text-lg">Chat with Advisor</CardTitle>
                            <CardDescription>Get instant updates on your case</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                            {ticket.messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50">
                                    <MessageSquare className="w-12 h-12" />
                                    <p>No messages yet. Say hello!</p>
                                </div>
                            ) : (
                                ticket.messages.map((msg) => {
                                    const isMe = msg.senderRole === 'USER';
                                    return (
                                        <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                            <div className={cn(
                                                "max-w-[80%] rounded-2xl p-4 shadow-sm",
                                                isMe ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none"
                                            )}>
                                                {!isMe && (
                                                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">
                                                        Advisor • {msg.sender.name}
                                                    </p>
                                                )}
                                                <p className="text-sm">{msg.content}</p>
                                                <p className={cn("text-[10px] mt-2 opacity-50", isMe ? "text-right" : "text-left")}>
                                                    {formatRelativeTime(msg.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={chatEndRef} />
                        </CardContent>
                        <div className="p-4 border-t border-white/5 bg-muted/30">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-background border border-border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <Button type="submit" disabled={!message.trim() || sendingMessage}>
                                    {sendingMessage ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="glass-card-strong border-none">
                            <CardHeader>
                                <CardTitle>Uploaded Documents</CardTitle>
                                <CardDescription>Manage your files</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {ticket.documents.length === 0 ? (
                                    <div className="text-center py-12 opacity-50">
                                        <FileText className="w-12 h-12 mx-auto mb-2" />
                                        <p>No documents uploaded</p>
                                    </div>
                                ) : (
                                    ticket.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-white/5 hover:bg-muted transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{doc.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{doc.status} • {formatDate(doc.uploadedAt)}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-dashed border-2 border-muted bg-transparent">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold">Upload Documents</h4>
                                    <p className="text-sm text-muted-foreground max-w-[250px]">
                                        Upload PAN card, Loan statements, or Court notices for case review.
                                    </p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    <Button className="pointer-events-none">
                                        Select File
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground">Max size: 10MB (PDF, PNG, JPG)</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
