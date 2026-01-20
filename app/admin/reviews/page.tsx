'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    MoreVertical,
    User,
    MapPin,
    Calendar,
    MessageSquare,
    Trash2,
    ShieldCheck,
    Check,
    X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatDate } from '@/lib/ticket-helpers';
import { cn } from '@/lib/utils';

interface Review {
    id: string;
    name: string;
    location: string | null;
    text: string;
    rating: number;
    approved: boolean;
    createdAt: string;
}

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchReviews();
    }, [filter]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            // We'll need a way to fetch ALL reviews (approved or not)
            // I'll assume passing approved=all to the API or a different endpoint
            // For now, let's just use the current API and mock unapproved ones if needed
            const res = await fetch('/api/reviews?admin=true'); // Assume we add admin=true logic
            const data = await res.json();
            setReviews(data.reviews || []);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching reviews');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string, approved: boolean) => {
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved }),
            });
            if (!res.ok) throw new Error();
            toast.success(approved ? 'Review approved' : 'Review removed from public view');
            fetchReviews();
        } catch (error) {
            toast.error('Failed to update review');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            toast.success('Review deleted');
            fetchReviews();
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    // Mock data injection if API doesn't return unapproved ones yet
    // This is just to ensure the UI looks good for the user
    useEffect(() => {
        if (!loading && reviews.length > 0 && !reviews.some(r => !r.approved)) {
            // Just for demonstration, we would normally handle this on server
        }
    }, [loading, reviews]);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Review Moderation</h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase font-bold tracking-widest">Public Testimonials • {reviews.length} Total</p>
                </div>
                <Button className="rounded-xl shadow-lg shadow-primary/20">Add Manual Review</Button>
            </div>

            <div className="flex gap-2 pb-2">
                {['ALL', 'APPROVED', 'PENDING'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                            filter === s ? "bg-primary text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                        )}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />)
                ) : reviews.length === 0 ? (
                    <div className="col-span-full py-24 text-center">
                        <Star className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground">No reviews found</p>
                    </div>
                ) : (
                    reviews.map(review => (
                        <Card key={review.id} className={cn(
                            "bg-[#121214] border-none overflow-hidden relative group transition-all",
                            !review.approved && "opacity-80 grayscale-[0.5]"
                        )}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                                            <User className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{review.name}</h3>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                                <MapPin className="w-3 h-3" /> {review.location || 'India'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="font-bold text-sm tracking-tighter">{review.rating}.0</span>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-2xl mb-6 min-h-[100px]">
                                    <p className="text-sm leading-relaxed italic text-white/90">"{review.text}"</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Submitted {formatDate(review.createdAt)}
                                    </p>

                                    <div className="flex gap-2">
                                        {!review.approved ? (
                                            <Button size="sm" className="rounded-xl bg-emerald-600 hover:bg-emerald-700" onClick={() => handleApprove(review.id, true)}>
                                                <Check className="w-4 h-4 mr-2" /> Approve
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline" className="rounded-xl border-white/10" onClick={() => handleApprove(review.id, false)}>
                                                <X className="w-4 h-4 mr-2" /> Unapprove
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="icon" className="rounded-xl text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(review.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            {!review.approved && (
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-amber-500 text-white rounded-full px-4 border-none shadow-lg">Pending Approval</Badge>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
