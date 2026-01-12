import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, TrendingUp, Phone, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        { icon: Users, value: "2500+", label: "Clients Helped", color: "text-primary" },
        { icon: TrendingUp, value: "₹50Cr+", label: "Debt Resolved", color: "text-emerald-500" },
        { icon: Shield, value: "98%", label: "Success Rate", color: "text-blue-500" },
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
                    className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-primary/40 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, -150, 0],
                        y: [0, 120, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1/2 -right-1/4 w-[1200px] h-[1200px] bg-secondary/40 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/30 rounded-full blur-3xl"
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            <div className="container mx-auto px-4 relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Trust Badge - More Prominent */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/30 backdrop-blur-md shadow-xl"
                        >
                            <Shield className="w-5 h-5 text-primary animate-pulse" />
                            <span className="text-sm font-bold text-foreground">
                                Appointment-Based Consultation | Unsecured Loans Advisory
                            </span>
                        </motion.div>

                        {/* Main Headline - Larger & Bolder */}
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[1.1] tracking-tight"
                            >
                                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-lg">
                                    FairPay
                                </span>
                                <span className="block text-foreground drop-shadow-lg mt-2">
                                    Solution
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary drop-shadow-md">
                                    Ethical Unsecured Loan Resolution
                                </h2>
                                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-medium">
                                    Expert guidance for <span className="text-primary font-bold">lawful, transparent,</span> and{" "}
                                    <span className="text-primary font-bold">structured debt resolution</span>
                                </p>
                            </motion.div>
                        </div>

                        {/* CTA Buttons - Larger & More Prominent */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <Button
                                size="lg"
                                onClick={onOpenCallback}
                                className="group relative bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500 text-primary-foreground font-bold text-lg px-10 py-8 rounded-2xl shadow-2xl hover:shadow-primary/50 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Get Free Consultation
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="border-3 border-primary/30 hover:bg-primary/10 text-foreground font-bold text-lg px-10 py-8 rounded-2xl backdrop-blur-md hover:scale-105 transition-all"
                            >
                                <a href="tel:+918449653755" className="flex items-center gap-3">
                                    <Phone className="w-6 h-6" />
                                    Call Expert Now
                                </a>
                            </Button>
                        </motion.div>

                        {/* Alert Text - More Visible */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-base font-semibold bg-amber-500/10 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-4 py-3 rounded-xl border border-amber-500/30 backdrop-blur-sm"
                        >
                            ⚠️ We are not a bank or lender. Consultancy services only.
                        </motion.p>

                        {/* Stats - Enhanced Design */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-3 gap-6 pt-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="relative group"
                                >
                                    <div className="glass-card-strong p-6 rounded-2xl hover:shadow-2xl transition-all border-2 border-border hover:border-primary/50">
                                        <stat.icon className={cn("w-8 h-8 mb-3", stat.color)} />
                                        <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground font-semibold">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Enhanced Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative glass-card-strong p-10 rounded-3xl shadow-2xl border-2 border-primary/30 backdrop-blur-2xl">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl -z-10" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                                    <Calculator className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-foreground">Debt Calculator</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Calculate your savings instantly</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Loan Amount Input */}
                                <div>
                                    <label className="block text-base font-bold text-foreground mb-4">
                                        Your Current Loan Amount
                                    </label>
                                    <input
                                        type="range"
                                        min="50000"
                                        max="5000000"
                                        step="50000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-4 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="mt-4 text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        ₹{loanAmount.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                {/* Savings Display - More Prominent */}
                                <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-8 rounded-2xl border-2 border-emerald-500/30 shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl" />
                                    <div className="relative">
                                        <div className="text-sm text-emerald-600 dark:text-emerald-300 font-bold mb-2">Potential Savings (40-60%)</div>
                                        <div className="text-5xl font-black text-foreground mb-3">
                                            ₹{savings.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">
                                            You could save up to this amount through structured settlement
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Indicator */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-muted-foreground">Steps to Debt Freedom</span>
                                        <span className="text-primary">5 Steps</span>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "20%" }}
                                            transition={{ duration: 1, delay: 1 }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary shadow-lg"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Start with a free consultation today
                                    </p>
                                </div>

                                {/* CTA */}
                                <Button
                                    onClick={onOpenCallback}
                                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all font-bold text-lg py-7 rounded-xl"
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
                            className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl text-base font-black border-2 border-white/20"
                        >
                            ₹50 Cr+ Resolved
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky CTA Bar - Enhanced */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
                <div className="bg-gradient-to-r from-primary via-secondary to-primary p-4 shadow-2xl border-t-2 border-primary/20">
                    <Button
                        onClick={onOpenCallback}
                        className="w-full bg-background text-primary hover:bg-background/90 font-black text-lg py-6 rounded-xl shadow-lg"
                        size="lg"
                    >
                        Get Free Consultation →
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
