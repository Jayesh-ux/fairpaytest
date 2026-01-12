import { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Shield,
    TrendingUp,
    AlertTriangle,
    FileText,
    Users,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Service {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    features: string[];
    badge?: string;
}

const services: Service[] = [
    {
        id: "personal-loan",
        title: "Personal Loan Settlement",
        subtitle: "Unsecured Only",
        description: "Expert guidance for resolving unsecured personal loan challenges through structured advisory",
        icon: Users,
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        features: [
            "Debt analysis & planning",
            "Lender negotiation support",
            "Settlement strategy",
            "Legal rights education",
        ],
    },
    {
        id: "credit-card",
        title: "Credit Card Debt Guidance",
        subtitle: "Stop the Stress",
        description: "Comprehensive advisory for credit card debt management and settlement options",
        icon: CreditCard,
        gradient: "from-purple-500 via-pink-500 to-rose-500",
        features: [
            "Outstanding balance review",
            "Repayment restructuring",
            "Interest negotiation tips",
            "CIBIL impact awareness",
        ],
        badge: "Most Popular",
    },
    {
        id: "anti-harassment",
        title: "Recovery Harassment Awareness",
        subtitle: "Know Your Rights",
        description: "Education on borrower rights and protection against unlawful recovery practices",
        icon: Shield,
        gradient: "from-emerald-500 via-green-500 to-teal-500",
        features: [
            "RBI guidelines education",
            "Legal rights training",
            "Complaint escalation process",
            "Documentation guidance",
        ],
    },
    {
        id: "credit-score",
        title: "Borrower Legal Rights Education",
        subtitle: "Empower Yourself",
        description: "Comprehensive training on your rights as a borrower under Indian law",
        icon: FileText,
        gradient: "from-amber-500 via-orange-500 to-red-500",
        features: [
            "Consumer protection laws",
            "Fair practices code",
            "Grievance redressal",
            "Written communication rights",
        ],
    },
    {
        id: "repayment-strategy",
        title: "Repayment & Settlement Strategy",
        subtitle: "Structured Planning",
        description: "Strategic planning for sustainable debt repayment and settlement negotiations",
        icon: TrendingUp,
        gradient: "from-indigo-500 via-purple-500 to-pink-500",
        features: [
            "Cash flow analysis",
            "Repayment scheduling",
            "Settlement negotiation prep",
            "Long-term financial planning",
        ],
    },
    {
        id: "documentation",
        title: "Documentation & Communication",
        subtitle: "Professional Support",
        description: "Assistance with loan documentation and professional lender communication",
        icon: AlertTriangle,
        gradient: "from-cyan-500 via-blue-500 to-indigo-500",
        features: [
            "Document organization",
            "Letter drafting support",
            "Communication templates",
            "Record keeping guidance",
        ],
    },
];

export function GlassmorphismServicesGrid() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary/5 to-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
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
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Our Services</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Comprehensive{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Advisory Services
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Expert guidance for unsecured loan challenges - transparent, ethical, and results-driven
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const isHovered = hoveredId === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="group relative"
                            >
                                {/* Card */}
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={cn(
                                        "relative h-full p-8 rounded-3xl transition-all duration-500 overflow-hidden",
                                        "bg-card/60 backdrop-blur-xl border-2",
                                        isHovered
                                            ? "border-primary/50 shadow-2xl"
                                            : "border-border/50 shadow-lg hover:shadow-xl"
                                    )}
                                >
                                    {/* Gradient Overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isHovered ? 0.1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity",
                                            service.gradient
                                        )}
                                    />

                                    {/* Badge */}
                                    {service.badge && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                                                {service.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className={cn(
                                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg relative z-10",
                                            service.gradient
                                        )}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                                                {service.subtitle}
                                            </span>
                                            <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2 mb-6">
                                            {service.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            variant="ghost"
                                            className="group/btn w-full justify-between hover:bg-primary/10 hover:text-primary transition-all"
                                        >
                                            <span>Learn More</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>

                                    {/* Shine Effect */}
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: isHovered ? "100%" : "-100%" }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                    />
                                </motion.div>

                                {/* 3D Shadow Effect */}
                                <div
                                    className={cn(
                                        "absolute inset-0 rounded-3xl bg-gradient-to-br -z-10 blur-xl transition-opacity duration-300",
                                        service.gradient,
                                        isHovered ? "opacity-30" : "opacity-0"
                                    )}
                                    style={{ transform: "translateY(10px)" }}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                            ❌ We do not assist with secured loans (Home, Car, Gold, Property Loans)
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
