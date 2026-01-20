'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users as UsersIcon,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Shield,
    ShieldCheck,
    Calendar,
    Ticket,
    MessageSquare,
    ArrowRight,
    Loader2,
    User,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatDate } from '@/lib/ticket-helpers';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
    createdAt: string;
    _count: {
        tickets: number;
        chatMessages: number;
    };
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/users?role=${roleFilter}`);
            const data = await res.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u =>
        (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase font-bold tracking-widest">Client Base • {users.length} Active Accounts</p>
                </div>
                <Button variant="outline" className="rounded-xl bg-white/5 border-white/10">Invite New User</Button>
            </div>

            <Card className="glass-card border-none">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full bg-[#121214] border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['ALL', 'USER', 'ADMIN'].map(role => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                                    roleFilter === role ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />)
                ) : filteredUsers.length === 0 ? (
                    <div className="col-span-full py-24 text-center">
                        <UsersIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground">No users found</p>
                    </div>
                ) : (
                    filteredUsers.map(user => (
                        <Card key={user.id} className="bg-[#121214] border-none group hover:ring-1 ring-primary/30 transition-all">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                                            {user.image ? (
                                                <img src={user.image} className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-6 h-6 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{user.name || 'Anonymous'}</h3>
                                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</p>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "rounded-full p-1",
                                        user.role === 'ADMIN' ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                                    )}>
                                        {user.role === 'ADMIN' ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-3 rounded-2xl text-center">
                                        <p className="text-xl font-bold">{user._count.tickets}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tickets</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl text-center">
                                        <p className="text-xl font-bold">{user._count.chatMessages}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Messages</p>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {formatDate(user.createdAt)}</span>
                                    <Button variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-primary/10 hover:text-primary p-0 px-2 group">
                                        Details <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
