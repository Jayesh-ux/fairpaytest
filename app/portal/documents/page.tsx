'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Search,
    Filter,
    Download,
    AlertCircle,
    FileCheck,
    FileWarning,
    Plus,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from 'sonner';
import { formatDate } from '@/lib/ticket-helpers';
import { cn } from '@/lib/utils';

interface Document {
    id: string;
    name: string;
    fileUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    ticket: {
        id: string;
        lenderName: string | null;
        loanType: string;
    };
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Upload State
    const [uploadOpen, setUploadOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await fetch('/api/tickets');
            const data = await res.json();

            setTickets(data.tickets || []);

            const allDocs: Document[] = [];
            data.tickets.forEach((ticket: any) => {
                if (ticket.documents) {
                    ticket.documents.forEach((doc: any) => {
                        allDocs.push({
                            ...doc,
                            ticket: {
                                id: ticket.id,
                                lenderName: ticket.lenderName,
                                loanType: ticket.loanType,
                            }
                        });
                    });
                }
            });

            setDocuments(allDocs);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching documents');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedTicketId) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name.split('.')[0]);

        setUploading(true);
        const toastId = toast.loading('Uploading document...');

        try {
            const res = await fetch(`/api/tickets/${selectedTicketId}/documents`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            toast.success('Document uploaded successfully', { id: toastId });
            setUploadOpen(false);
            fetchDocuments(); // Refresh list
            setSelectedTicketId('');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload document', { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        (doc.ticket.lenderName || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-6xl 3xl:max-w-[1400px] 4xl:max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl 3xl:text-4xl font-bold">My Documents</h1>
                    <p className="text-muted-foreground 3xl:text-lg">Manage and track your submitted documents</p>
                </div>
                <Button onClick={() => setUploadOpen(true)} className="w-full md:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 3xl:gap-6">
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-70 uppercase">Total Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{documents.length}</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-70 uppercase">Approved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-500">
                            {documents.filter(d => d.status === 'APPROVED').length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-70 uppercase">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-amber-500">
                            {documents.filter(d => d.status === 'PENDING').length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-70 uppercase">Rejected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-500">
                            {documents.filter(d => d.status === 'REJECTED').length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search documents or lenders..."
                        className="w-full bg-muted/50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <Button variant="secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                </Button>
            </div>

            <div className="bg-background rounded-2xl overflow-hidden shadow-sm border border-border/50">
                {/* Desktop Table View */}
                <table className="w-full text-left hidden md:table">
                    <thead className="bg-muted/50 border-b border-border/50">
                        <tr>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Document Name</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Related Ticket</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Uploaded On</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                            <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-6 py-6 h-16 bg-muted/20" />
                                </tr>
                            ))
                        ) : filteredDocs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                    <p>No documents found</p>
                                </td>
                            </tr>
                        ) : (
                            filteredDocs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/portal/tickets/${doc.ticket.id}`} className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                                            {doc.ticket.lenderName || doc.ticket.loanType}
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {formatDate(doc.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={cn(
                                            "rounded-full px-2",
                                            doc.status === 'APPROVED' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                                                doc.status === 'REJECTED' ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" :
                                                    "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                        )}>
                                            {doc.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-muted/20 animate-pulse rounded-xl" />
                        ))
                    ) : filteredDocs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p>No documents found</p>
                        </div>
                    ) : (
                        filteredDocs.map((doc) => (
                            <div key={doc.id} className="bg-muted/10 border border-border/50 rounded-xl p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm line-clamp-1">{doc.name}</p>
                                            <p className="text-xs text-muted-foreground">{formatDate(doc.createdAt)}</p>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "rounded-full px-2 text-[10px]",
                                        doc.status === 'APPROVED' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                            doc.status === 'REJECTED' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    )}>
                                        {doc.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                                    <Link href={`/portal/tickets/${doc.ticket.id}`} className="text-primary hover:underline text-xs font-medium flex items-center gap-1">
                                        Related to {doc.ticket.lenderName || doc.ticket.loanType}
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Upload Dialog */}
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                        <DialogDescription>
                            Select the case you want to upload documents for.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Select Case</Label>
                            <Select value={selectedTicketId} onValueChange={setSelectedTicketId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a case..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {tickets.map((t) => (
                                        <SelectItem key={t.id} value={t.id}>
                                            {t.lenderName || t.loanType} - {t.id.slice(0, 8)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedTicketId && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                <Label>Choose File</Label>
                                <div className="border-2 border-dashed border-muted rounded-xl p-8 text-center hover:bg-muted/50 transition-colors relative">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            {uploading ? (
                                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Plus className="w-5 h-5" />
                                            )}
                                        </div>
                                        <p className="text-sm font-medium">
                                            {uploading ? 'Uploading...' : 'Click to select file'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">PDF, JPG or PNG (Max 10MB)</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
