import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Award,
    Shield,
    TrendingUp,
    Users,
    Newspaper,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
    id: string;
    icon: React.ElementType;
    value: number;
    suffix: string;
    prefix?: string;
    label: string;
    gradient: string;
}

const stats: Stat[] = [
    {
        id: "clients",
        icon: Users,
        value: 2500,
        suffix: "+",
        label: "Clients Helped",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "debt",
        icon: TrendingUp,
        value: 50,
        suffix: " Cr+",
        prefix: "₹",
        label: "Debt Resolved",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        id: "success",
        icon: Award,
        value: 98,
        suffix: "%",
        label: "Success Rate",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        id: "experience",
        icon: Shield,
        value: 3,
        suffix: "+",
        label: "Years Experience",
        gradient: "from-purple-500 to-pink-500",
    },
];

const mediaHeadlines = [
    "FairPay Solution - Growing as India's trusted unsecured loan advisory platform",
    "₹50 Crore+ debt resolved through ethical advisory services",
    "2500+ borrowers empowered with legal rights education",
    "Leading the way in transparent debt resolution advisory",
    "98% success rate in client satisfaction and debt resolution",
    "Pioneering ethical practices in loan settlement advisory",
    "Helping thousands achieve financial freedom through structured guidance",
    "Expert panel of advisors with 3+ years of combined experience",
];

const trustBadges = [
    { icon: Shield, label: "RBI Guidelines Compliant" },
    { icon: CheckCircle2, label: "Transparent Advisory" },
    { icon: Award, label: "Ethical Practices" },
    { icon: Users, label: "Client Confidentiality" },
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, isInView]);

    return <span ref={ref} className="inline-block">{count.toLocaleString('en-IN')}</span>;
}

export function TrustMediaSection() {
    const [currentHeadline, setCurrentHeadline] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadline((prev) => (prev + 1) % mediaHeadlines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />

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
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Trusted by Thousands</span>
                    </div>
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 xs:mb-5 sm:mb-6 px-2 xs:px-4">
                        India's Leading{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Debt Advisory Platform
                        </span>
                    </h2>
                </motion.div>

                {/* Animated Stats Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-12 sm:mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card-strong p-3 xs:p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
                                >
                                    {/* Gradient Background */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity",
                                            stat.gradient
                                        )}
                                    />

                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 shadow-lg relative z-10",
                                            stat.gradient
                                        )}
                                    >
                                        <Icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>

                                    {/* Value */}
                                    <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-1 xs:mb-1.5 sm:mb-2 relative z-10 flex items-baseline gap-0.5 xs:gap-1">
                                        {stat.prefix && <span className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl">{stat.prefix}</span>}
                                        <AnimatedCounter value={stat.value} />
                                        {stat.suffix && <span className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl">{stat.suffix}</span>}
                                    </div>

                                    {/* Label */}
                                    <div className="text-[0.65rem] xs:text-xs sm:text-sm text-muted-foreground relative z-10 leading-tight">{stat.label}</div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Media Presence - News Ticker */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="glass-card-strong p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
                        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6">
                            <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                                <Newspaper className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">Media Presence</h3>
                                <p className="text-[0.65rem] xs:text-xs sm:text-sm text-muted-foreground truncate">Latest achievements and milestones</p>
                            </div>
                        </div>

                        {/* Animated Headlines */}
                        <div className="relative min-h-[80px] xs:min-h-[90px] sm:min-h-[100px] md:h-24 overflow-hidden">
                            <motion.div
                                key={currentHeadline}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center px-1"
                            >
                                <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 w-full">
                                    <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-primary mt-1.5 xs:mt-2 flex-shrink-0 animate-pulse" />
                                    <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-relaxed break-words">
                                        {mediaHeadlines[currentHeadline]}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Progress Dots */}
                        <div className="flex items-center justify-center gap-1.5 xs:gap-2 mt-3 xs:mt-4">
                            {mediaHeadlines.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentHeadline(index)}
                                    className={cn(
                                        "transition-all rounded-full",
                                        index === currentHeadline
                                            ? "w-6 xs:w-8 h-1.5 xs:h-2 bg-primary"
                                            : "w-1.5 xs:w-2 h-1.5 xs:h-2 bg-muted hover:bg-muted-foreground"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4"
                >
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={badge.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="glass-card p-3 xs:p-4 rounded-xl xs:rounded-2xl flex items-center gap-2 xs:gap-3 hover:shadow-lg transition-all"
                            >
                                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-primary" />
                                </div>
                                <span className="text-[0.65rem] xs:text-xs sm:text-sm font-semibold text-foreground leading-tight">{badge.label}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Join 2500+ satisfied clients who achieved debt freedom</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
