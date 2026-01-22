'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, Phone, CheckCircle, Clock, AlertTriangle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EmergencyContact {
    id: string;
    name: string;
    phone: string;
    message: string | null;
    status: string;
    paymentStatus: string;
    amount: number;
    paymentId: string | null;
    createdAt: string;
}

export default function EmergencyAdminPage() {
    const [contacts, setContacts] = useState<EmergencyContact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const router = useRouter();

    // Polling for new requests every 30 seconds
    useEffect(() => {
        fetchContacts();
        const interval = setInterval(fetchContacts, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchContacts = async () => {
        try {
            // We will need to create this API endpoint
            const res = await fetch('/api/admin/emergency');
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch (error) {
            console.error('Failed to fetch emergency contacts', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/emergency/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setContacts(contacts.map(c =>
                    c.id === id ? { ...c, status: newStatus } : c
                ));
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const filteredContacts = contacts.filter(contact => {
        const matchesFilter = filter === 'ALL' || contact.status === filter;
        const matchesSearch =
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.phone.includes(search);

        // Only show PAID requests by default unless looking for unpaid?
        // Actually, we generally only care about PAID requests for emergency.
        // Let's filter out PENDING payments unless specifically asked, 
        // or maybe show them but visually distinct.

        return matchesFilter && matchesSearch;
    });

    // Sort by date (newest first), but prioritize PAID & PENDING Status
    const sortedContacts = [...filteredContacts].sort((a, b) => {
        // Prioritize PAID + PENDING (Action Required)
        const aPriority = a.paymentStatus === 'PAID' && a.status === 'PENDING' ? 1 : 0;
        const bPriority = b.paymentStatus === 'PAID' && b.status === 'PENDING' ? 1 : 0;

        if (aPriority > bPriority) return -1;
        if (aPriority < bPriority) return 1;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Badge variant="destructive" className="animate-pulse">Action Required</Badge>;
            case 'CALLED':
                return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Called</Badge>;
            case 'RESOLVED':
                return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                        Emergency Requests
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage paid priority consultation requests.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {contacts.filter(c => c.paymentStatus === 'PAID' && c.status === 'PENDING').length} Actionable
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search name or phone..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Requests</SelectItem>
                                    <SelectItem value="PENDING">Pending Action</SelectItem>
                                    <SelectItem value="CALLED">Called</SelectItem>
                                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Client Details</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedContacts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                            No emergency requests found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedContacts.map((contact) => (
                                        <TableRow key={contact.id} className={contact.paymentStatus === 'PAID' ? 'bg-red-50/10' : 'opacity-60'}>
                                            <TableCell className="whitespace-nowrap font-medium">
                                                <div className="flex flex-col">
                                                    <span>{format(new Date(contact.createdAt), 'MMM d, yyyy')}</span>
                                                    <span className="text-xs text-muted-foreground">{format(new Date(contact.createdAt), 'h:mm a')}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{contact.name}</span>
                                                    <a href={`tel:${contact.phone}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {contact.phone}
                                                    </a>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {contact.paymentStatus === 'PAID' ? (
                                                    <Badge className="bg-green-600 hover:bg-green-700">
                                                        PAID ₹{contact.amount}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-gray-500">
                                                        {contact.paymentStatus}
                                                    </Badge>
                                                )}
                                                {contact.paymentId && (
                                                    <div className="text-[10px] text-gray-500 mt-1 font-mono">{contact.paymentId}</div>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-[200px]">
                                                <p className="truncate text-sm" title={contact.message || ''}>
                                                    {contact.message || '-'}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(contact.status)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {contact.paymentStatus === 'PAID' && (
                                                    <Select
                                                        value={contact.status}
                                                        onValueChange={(val) => updateStatus(contact.id, val)}
                                                    >
                                                        <SelectTrigger className="w-[130px] ml-auto h-8">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="PENDING">Pending</SelectItem>
                                                            <SelectItem value="CALLED">Mark Called</SelectItem>
                                                            <SelectItem value="RESOLVED">Resolved</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
