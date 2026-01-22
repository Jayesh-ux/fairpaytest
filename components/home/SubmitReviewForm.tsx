import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitReviewFormProps {
    onSuccess: (reviewData: { name: string; location: string; review: string; rating: number }) => void;
}

export function SubmitReviewForm({ onSuccess }: SubmitReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        review: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    location: formData.location,
                    text: formData.review,
                    rating: rating
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            // Still call onSuccess if it handles any local state
            onSuccess({
                name: formData.name,
                location: formData.location,
                review: formData.review,
                rating: rating
            });

            setIsSuccess(true);
            setFormData({ name: "", location: "", review: "" });
            setRating(5);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Share Your Experience</h2>
                        <p className="text-muted-foreground">Your feedback helps others make informed decisions about their financial journey.</p>
                    </div>

                    <div className="glass-card-strong p-8 md:p-10 rounded-3xl shadow-xl border-2 border-primary/20 bg-background/50 backdrop-blur-xl">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                                <p className="text-muted-foreground mb-8">Your review has been submitted successfully and helps us improve our service.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSuccess(false)}
                                >
                                    Submit Another Review
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col items-center mb-6">
                                    <label className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Select Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className="transition-transform hover:scale-110"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                            >
                                                <Star
                                                    className={cn(
                                                        "w-10 h-10 transition-colors",
                                                        star <= (hover || rating)
                                                            ? "text-amber-500 fill-amber-500"
                                                            : "text-muted-foreground/30"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="review-name" className="text-sm font-semibold ml-1">Your Name</label>
                                        <input
                                            id="review-name"
                                            name="name"
                                            autoComplete="name"
                                            type="text"
                                            required
                                            placeholder="John D."
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="review-location" className="text-sm font-semibold ml-1">Your Location</label>
                                        <input
                                            id="review-location"
                                            name="location"
                                            autoComplete="address-level2"
                                            type="text"
                                            required
                                            placeholder="Agra, UP"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="review-text" className="text-sm font-semibold ml-1">Your Review</label>
                                    <textarea
                                        id="review-text"
                                        name="review"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your experience with our services..."
                                        value={formData.review}
                                        onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                        className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:shadow-primary/30 group"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Submit Your Review
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                                <p className="text-[10px] text-center text-muted-foreground mt-4">
                                    By submitting, you agree to allow us to display your review on our website. We prioritize your privacy and will only show your first name and city.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
