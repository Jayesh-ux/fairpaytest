import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    image: string;
    rating: number;
    review: string;
    beforeAmount?: number;
    afterAmount?: number;
    savingsPercent?: number;
    timeframe?: string;
    loanType?: string;
}

export const initialTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Raj S.",
        location: "Sanjay Place, Agra",
        image: "RS",
        rating: 5,
        review: "FairPay Solution helped me understand my rights as a borrower. Their advisory was transparent and professional. I was able to settle my ₹10L personal loan for ₹4L through their guidance. Life-changing experience!",
        beforeAmount: 1000000,
        afterAmount: 400000,
        savingsPercent: 60,
        timeframe: "18 months",
        loanType: "Personal Loan",
    },
    {
        id: 2,
        name: "Priyanka K.",
        location: "Mathura, Uttar Pradesh",
        image: "PK",
        rating: 5,
        review: "The harassment calls stopped within a week of consulting with FairPay. Their team educated me about RBI guidelines and my legal rights. Professional, ethical, and results-driven advisory service.",
        beforeAmount: 350000,
        afterAmount: 150000,
        savingsPercent: 57,
        timeframe: "12 months",
        loanType: "Credit Card Debt",
    },
    {
        id: 3,
        name: "Arjun M.",
        location: "Aligarh, Uttar Pradesh",
        image: "AM",
        rating: 5,
        review: "I was drowning in credit card debt with no way out. FairPay's structured advisory helped me negotiate a settlement and plan my finances better. My credit score improved from 520 to 720 over time. Thank you!",
        beforeAmount: 800000,
        afterAmount: 350000,
        savingsPercent: 56,
        timeframe: "24 months",
        loanType: "Multiple Loans",
    },
    {
        id: 4,
        name: "Vikram P.",
        location: "Firozabad, Uttar Pradesh",
        image: "VP",
        rating: 5,
        review: "Excellent consultation service. They explained all my options clearly without any false promises. The team helped me understand the settlement process and supported me throughout. Highly recommended!",
        beforeAmount: 600000,
        afterAmount: 270000,
        savingsPercent: 55,
        timeframe: "15 months",
        loanType: "Personal Loan",
    },
    {
        id: 5,
        name: "Amir J.",
        location: "Dayalbagh, Agra",
        image: "AJ",
        rating: 5,
        review: "FairPay Solution's advisory service is genuine and trustworthy. They helped me navigate through my loan crisis with proper legal guidance. The consultation was worth every penny. Debt-free now!",
        beforeAmount: 450000,
        afterAmount: 200000,
        savingsPercent: 56,
        timeframe: "14 months",
        loanType: "Digital App Loans",
    },
];

interface AutoRotatingTestimonialsProps {
    testimonials: Testimonial[];
}

export function AutoRotatingTestimonials({ testimonials }: AutoRotatingTestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const currentTestimonial = testimonials[currentIndex];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-sm font-medium text-primary">Client Success Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Real Results from{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Real People
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        See how our advisory services have helped thousands achieve debt freedom
                    </p>
                </motion.div>

                {/* Main Testimonial Card */}
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card-strong p-8 lg:p-12 rounded-3xl shadow-2xl"
                        >
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Left: Review Content */}
                                <div className="space-y-6">
                                    {/* Quote Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                                        <Quote className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-5 h-5",
                                                    i < currentTestimonial.rating
                                                        ? "text-amber-500 fill-amber-500"
                                                        : "text-muted"
                                                )}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm font-semibold text-muted-foreground">
                                            {currentTestimonial.rating}.0
                                        </span>
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed">
                                        "{currentTestimonial.review}"
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {currentTestimonial.image}
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg text-foreground">
                                                {currentTestimonial.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {currentTestimonial.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Metrics */}
                                <div className="space-y-4">
                                    {/* Loan Type Badge */}
                                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                        {currentTestimonial.loanType || "Resolved User"}
                                    </div>

                                    {/* Before/After Metrics */}
                                    <div className="space-y-4">
                                        {currentTestimonial.beforeAmount ? (
                                            <>
                                                {/* Before */}
                                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-muted-foreground">Original Debt</span>
                                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    <div className="text-3xl font-bold text-red-600">
                                                        ₹{(currentTestimonial.beforeAmount / 100000).toFixed(1)}L
                                                    </div>
                                                </div>

                                                {/* After */}
                                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm text-muted-foreground">Settled For</span>
                                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                    </div>
                                                    <div className="text-3xl font-bold text-emerald-600">
                                                        ₹{((currentTestimonial.afterAmount || 0) / 100000).toFixed(1)}L
                                                    </div>
                                                </div>

                                                {/* Savings */}
                                                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                                                    <div className="text-sm text-white/80 mb-2">Total Savings</div>
                                                    <div className="text-4xl font-bold text-white mb-1">
                                                        {currentTestimonial.savingsPercent}%
                                                    </div>
                                                    <div className="text-sm text-white/80">
                                                        Saved ₹{((currentTestimonial.beforeAmount - (currentTestimonial.afterAmount || 0)) / 100000).toFixed(1)}L
                                                    </div>
                                                </div>

                                                {/* Timeframe */}
                                                {currentTestimonial.timeframe && (
                                                    <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                                        <div className="text-sm text-muted-foreground mb-1">Resolution Time</div>
                                                        <div className="text-xl font-bold text-foreground">
                                                            {currentTestimonial.timeframe}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="p-8 rounded-3xl bg-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-center space-y-4">
                                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Verified Consultation</h4>
                                                    <p className="text-sm text-muted-foreground">This user has successfully completed our advisory program.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={goToPrevious}
                            className="w-12 h-12 rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={cn(
                                        "transition-all rounded-full",
                                        index === currentIndex
                                            ? "w-8 h-2 bg-primary"
                                            : "w-2 h-2 bg-muted hover:bg-muted-foreground"
                                    )}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={goToNext}
                            className="w-12 h-12 rounded-full hover:bg-primary hover:text-white transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Auto-play Indicator */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {isAutoPlaying ? "⏸ Pause" : "▶ Play"} Auto-rotation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
