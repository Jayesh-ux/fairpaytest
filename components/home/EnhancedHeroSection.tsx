'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, TrendingUp, Phone, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EnhancedHeroSectionProps {
    onOpenCallback: () => void;
}

export function EnhancedHeroSection({ onOpenCallback }: EnhancedHeroSectionProps) {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [savings, setSavings] = useState(0);

    useEffect(() => {
        // Calculate 40-60% savings
        const minSavings = loanAmount * 0.4;
        const maxSavings = loanAmount * 0.6;
        setSavings(Math.round((minSavings + maxSavings) / 2));
    }, [loanAmount]);

    const stats = [
        { icon: Users, value: "2500+", label: "Clients Helped", color: "text-primary", link: "/how-it-works" },
        { icon: TrendingUp, value: "₹50Cr+", label: "Debt Resolved", color: "text-emerald-500", link: "/eligibility" },
        { icon: Shield, value: "98%", label: "Client Satisfaction", color: "text-blue-500", link: "/eligibility" },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/10 to-secondary/10">
            {/* Animated Background Orbs - More Vibrant */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.6, 0.4],
                        x: [0, 150, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/2 -left-1/4 w-[500px] md:w-[800px] lg:w-[1000px] h-[500px] md:h-[800px] lg:h-[1000px] bg-primary/40 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, -150, 0],
                        y: [0, 120, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1/2 -right-1/4 w-[600px] md:w-[1000px] lg:w-[1200px] h-[600px] md:h-[1000px] lg:h-[1200px] bg-secondary/40 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] bg-accent/30 rounded-full blur-3xl"
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 md:py-20 3xl:max-w-[1920px]">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
                    {/* Left Content - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4 sm:space-y-6 md:space-y-8"
                    >
                        {/* Trust Badge - More Prominent */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-primary/10 border-2 border-primary/30 backdrop-blur-md shadow-xl max-w-full"
                        >
                            <Shield className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-primary animate-pulse flex-shrink-0" />
                            <span className="text-[0.65rem] xs:text-xs sm:text-sm font-bold text-foreground leading-tight text-center">
                                Appointment-Based | Unsecured Loans
                            </span>
                        </motion.div>

                        {/* Main Headline - Larger & Bolder */}
                        <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-[2rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 3xl:text-9xl font-display font-black leading-[1.1] tracking-tight"
                            >
                                <h1 className="inherit">
                                    <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-lg">
                                        FairPay
                                    </span>
                                    <span className="block text-foreground drop-shadow-lg mt-1 sm:mt-2">
                                        Solution
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-2 sm:space-y-3 md:space-y-4"
                            >
                                <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl font-bold text-primary drop-shadow-md">
                                    Ethical Unsecured Loan Resolution
                                </h2>
                                <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-medium">
                                    Expert guidance for <Link href="/how-it-works" className="text-primary font-bold hover:underline">lawful, transparent,</Link> and{" "}
                                    <Link href="/eligibility" className="text-primary font-bold hover:underline">structured debt resolution</Link>
                                </p>
                            </motion.div>
                        </div>

                        {/* CTA Buttons - Larger & More Prominent */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-4 md:gap-6"
                        >
                            <Button
                                size="lg"
                                onClick={onOpenCallback}
                                className="group relative bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500 text-primary-foreground font-bold text-xs xs:text-sm sm:text-base md:text-lg px-4 xs:px-6 sm:px-8 md:px-10 py-4 xs:py-5 sm:py-6 md:py-8 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-primary/50 hover:scale-105 w-full sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
                                    <span className="whitespace-nowrap">Get Free Consultation</span>
                                    <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                                </span>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="border-3 border-primary/30 hover:bg-primary/10 text-foreground font-bold text-xs xs:text-sm sm:text-base md:text-lg px-4 xs:px-6 sm:px-8 md:px-10 py-4 xs:py-5 sm:py-6 md:py-8 rounded-xl md:rounded-2xl backdrop-blur-md hover:scale-105 transition-all w-full sm:w-auto"
                            >
                                <a href="tel:+919389815277" className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3">
                                    <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                                    <span className="whitespace-nowrap">Call Expert Now</span>
                                </a>
                            </Button>
                        </motion.div>

                        {/* Alert Text - More Visible */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xs sm:text-sm md:text-base font-semibold bg-amber-500/10 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg md:rounded-xl border border-amber-500/30 backdrop-blur-sm"
                        >
                            ⚠️ We are not a bank or lender. Consultancy services only.
                        </motion.p>

                        {/* Stats - Enhanced Design */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-4 sm:pt-6 md:pt-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    className="relative group cursor-pointer"
                                >
                                    <Link href={stat.link}>
                                        <div className="glass-card-strong p-1.5 xs:p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl hover:shadow-2xl transition-all border-2 border-border hover:border-primary/50">
                                            <stat.icon className={cn("w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mb-1 sm:mb-2 md:mb-3", stat.color)} />
                                            <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-foreground mb-0.5 sm:mb-1">{stat.value}</div>
                                            <div className="text-[0.5rem] xs:text-[0.6rem] sm:text-xs text-muted-foreground font-semibold leading-tight">{stat.label}</div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Enhanced Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div className="relative glass-card-strong p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-primary/30 backdrop-blur-2xl">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl md:rounded-3xl blur-xl -z-10" />

                            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Calculator className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-foreground truncate">Debt Calculator</h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Estimate potential reduction</p>
                                </div>
                            </div>

                            <div className="space-y-4 sm:space-y-6 md:space-y-8">
                                {/* Loan Amount Input */}
                                <div>
                                    <label htmlFor="loan-amount" className="block text-xs xs:text-sm sm:text-base font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
                                        Your Current Loan Amount
                                    </label>
                                    <input
                                        id="loan-amount"
                                        name="loanAmount"
                                        aria-label="Your Current Loan Amount"
                                        type="range"
                                        min="50000"
                                        max="5000000"
                                        step="50000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-3 sm:h-4 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="mt-2 sm:mt-3 md:mt-4 text-2xl xs:text-3xl sm:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        ₹{loanAmount.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                {/* Savings Display - More Prominent */}
                                <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 xs:p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border-2 border-emerald-500/30 shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl md:rounded-2xl blur-xl" />
                                    <div className="relative">
                                        <div className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-bold mb-1 sm:mb-2">Potential Savings (40-60%)</div>
                                        <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-2 sm:mb-3">
                                            ₹{savings.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                            Estimated potential reduction through structured settlement
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                                        <span className="text-muted-foreground">Steps to Debt Resolution</span>
                                        <span className="text-primary">5 Steps</span>
                                    </div>
                                    <div className="h-2 sm:h-3 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "20%" }}
                                            transition={{ duration: 1, delay: 1 }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary shadow-lg"
                                        />
                                    </div>
                                    <p className="text-[0.65rem] xs:text-xs text-muted-foreground font-medium">
                                        Start with a free consultation today
                                    </p>
                                </div>

                                {/* CTA */}
                                <Button
                                    onClick={onOpenCallback}
                                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all font-bold text-sm sm:text-base md:text-lg py-5 sm:py-6 md:py-7 rounded-lg md:rounded-xl"
                                    size="lg"
                                >
                                    Calculate My Savings →
                                </Button>
                            </div>
                        </div>

                        {/* Floating Badge - More Prominent */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="hidden sm:block absolute -top-4 sm:-top-6 -right-3 sm:-right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl text-xs sm:text-sm md:text-base font-black border-2 border-white/20"
                        >
                            ₹50 Cr+ Resolved
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

