'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
    Camera,
    LogOut,
    ChevronRight,
    MapPin,
    Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/ticket-helpers';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [editing, setEditing] = useState(false);

    if (!session?.user) return null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Account Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and security settings</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="glass-card-strong border-none text-center">
                        <CardContent className="pt-8">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background overflow-hidden">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-primary" />
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">{session.user.name}</h2>
                                <Badge variant="secondary" className="mt-1 rounded-full px-4 border-none bg-muted/50">
                                    {session.user.role || 'CLIENT'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                Verification Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Identity</span>
                                <span className="text-green-500 font-bold uppercase text-[10px]">Verified</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Email</span>
                                <span className="text-green-500 font-bold uppercase text-[10px]">Verified</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="text-amber-500 font-bold uppercase text-[10px]">Pending</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Details & Settings */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="glass-card-strong border-none">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Personal Details</CardTitle>
                                <CardDescription>Your contact and personal information</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                                {editing ? 'Cancel' : 'Edit Info'}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <User className="w-3 h-3" /> Full Name
                                    </label>
                                    <p className="font-medium text-foreground">{session.user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Mail className="w-3 h-3" /> Email Address
                                    </label>
                                    <p className="font-medium text-foreground">{session.user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> Phone Number
                                    </label>
                                    <p className="font-medium text-foreground">
                                        {session.user.phone || 'Add phone number'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> Member Since
                                    </label>
                                    <p className="font-medium text-foreground">
                                        {session.user.createdAt ? formatDate(session.user.createdAt) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {editing && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-6 border-t border-white/5 space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Update Phone</label>
                                        <input className="w-full bg-muted/50 border-none rounded-xl py-2 px-4 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+91 99999 99999" />
                                    </div>
                                    <Button className="w-full">Save Changes</Button>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="glass-card-strong border-none">
                        <CardHeader>
                            <CardTitle>Security & Account</CardTitle>
                            <CardDescription>Manage your security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold">Security Log</p>
                                        <p className="text-xs text-muted-foreground">View recent login activities</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold">Two-Factor Authentication</p>
                                        <p className="text-xs text-muted-foreground">Recommended for better security</p>
                                    </div>
                                </div>
                                <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Setup</Badge>
                            </button>

                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-500/10 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                        <LogOut className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold">Sign Out</p>
                                        <p className="text-xs text-muted-foreground">End your current session</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
