'use client';

import { motion } from "framer-motion";
import { Shield, Handshake, Scale, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Shield,
        emoji: "🛡️",
        title: "Professional Debt Counselling",
        titleHindi: "पेशेवर ऋण परामर्श",
        description: "Confused about your finances? We analyze your current debt structure and create a personalized roadmap to manage your liabilities. We don't just offer advice; we build a legal strategy to help you regain financial control.",
        color: "from-blue-500 to-cyan-500",
        bgGlow: "bg-blue-500/20",
        link: "/how-it-works",
    },
    {
        icon: Handshake,
        emoji: "🤝",
        title: "Expert Loan Negotiation Services",
        titleHindi: "विशेषज्ञ ऋण वार्ता सेवाएं",
        description: "Stop struggling with high interest and penalties. Our legal experts communicate directly with banks and financial institutions on your behalf. We negotiate for fair settlement amounts and affordable repayment terms, so you save money legally.",
        color: "from-emerald-500 to-teal-500",
        bgGlow: "bg-emerald-500/20",
        link: "/eligibility",
    },
    {
        icon: Scale,
        emoji: "⚖️",
        title: "Harassment Protection & Legal Advice",
        titleHindi: "उत्पीड़न सुरक्षा और कानूनी सलाह",
        description: "Facing abusive recovery calls or legal threats? You have rights. We educate you on RBI guidelines and provide strong legal support to stop unethical harassment from recovery agents immediately. We stand between you and the creditors.",
        color: "from-amber-500 to-orange-500",
        bgGlow: "bg-amber-500/20",
        link: "/dashboard/harassment",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export function CoreServicesHighlight() {
    return (
        <section className="py-16 lg:py-20 bg-transparent relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-lg">✨</span>
                        <span className="text-sm font-medium text-primary">3-Step Shield</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Your Path to{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Debt-Free Life
                        </span>
                    </h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
                        Legal & Strategic Solutions
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        We understand that managing unsecured loans can be stressful. At <strong className="text-foreground">FairPay Solutions</strong>, we provide a <strong className="text-primary">3-step shield</strong> to protect your financial future and mental peace:
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            className="group relative"
                        >
                            {/* Glow effect on hover */}
                            <div
                                className={`absolute -inset-1 ${service.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            {/* Card */}
                            <div className="relative h-full glass-card-strong rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                                {/* Background gradient on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                />

                                {/* Icon container */}
                                <div className="relative mb-6">
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <div className="w-full h-full rounded-2xl bg-background/90 flex items-center justify-center">
                                            <service.icon className="w-7 h-7 text-foreground" />
                                        </div>
                                    </div>
                                    {/* Floating emoji */}
                                    <motion.span
                                        className="absolute -top-2 -right-2 text-2xl"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {service.emoji}
                                    </motion.span>
                                </div>

                                {/* Content */}
                                <div className="relative space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {service.titleHindi}
                                        </p>
                                    </div>

                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* CTA Link */}
                                    <Link
                                        href={service.link}
                                        className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300 pt-2`}
                                    >
                                        Learn More
                                        <ArrowRight className={`w-4 h-4 text-primary group-hover:translate-x-1 transition-transform`} />
                                    </Link>
                                </div>

                                {/* Decorative corner element */}
                                <div
                                    className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom accent */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-10"
                >
                    <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-semibold">2700+</span> clients helped with our expert services
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
