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

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            // For now, we fetch tickets and flat map documents, or if we have a direct API...
            // Let's use the tickets API and get all docs.
            const res = await fetch('/api/tickets');
            const data = await res.json();

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

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        (doc.ticket.lenderName || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">My Documents</h1>
                    <p className="text-muted-foreground">Manage and track your submitted documents</p>
                </div>
                <Button variant="outline" disabled className="cursor-not-allowed">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <table className="w-full text-left">
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
            </div>
        </div>
    );
}
