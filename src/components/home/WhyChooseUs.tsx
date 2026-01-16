import { motion } from "framer-motion";
import { Scale, ShieldOff, TrendingDown, Lock, CheckCircle } from "lucide-react";

const benefits = [
    {
        icon: Scale,
        emoji: "⚖️",
        number: "01",
        title: "Expert Legal Protection",
        description: "We are not just mediators; we are legal consultants. We understand the depths of Indian banking laws and RBI guidelines. Our team ensures that you are protected against illegal recovery practices while we work on your settlement.",
        color: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-500/10",
        borderColor: "border-violet-500/20",
    },
    {
        icon: ShieldOff,
        emoji: "🚫",
        number: "02",
        title: "Understand Your Rights Against Harassment",
        description: "Your peace of mind is our priority. Once you onboard with us, we step in to help you understand your legal rights against abusive recovery practices. We guide you on how to handle creditor communication professionally.",
        color: "from-rose-500 to-pink-600",
        bgColor: "bg-rose-500/10",
        borderColor: "border-rose-500/20",
    },
    {
        icon: TrendingDown,
        emoji: "📉",
        number: "03",
        title: "Maximized Savings",
        description: "Our experienced negotiators know exactly how to talk to banks. We strive to get you the lowest possible settlement amount and the most favorable repayment terms, helping you save a significant amount of your hard-earned money.",
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
    },
    {
        icon: Lock,
        emoji: "🔒",
        number: "04",
        title: "Completely Confidential & Transparent",
        description: "We respect your privacy. Your financial details and personal information remain strictly confidential with us. We operate with complete transparency—no hidden charges, just honest legal guidance and support.",
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export function WhyChooseUs() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Why Trust Us</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            FairPay Solutions?
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Your trusted partner in achieving financial freedom through legal expertise
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className={`relative h-full p-6 lg:p-8 rounded-2xl ${benefit.bgColor} border ${benefit.borderColor} hover:border-primary/40 transition-all duration-300 overflow-hidden`}>
                                {/* Hover glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                {/* Number badge */}
                                <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                                    <span className={`text-5xl lg:text-6xl font-bold bg-gradient-to-br ${benefit.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-30 transition-opacity`}>
                                        {benefit.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="relative space-y-4">
                                    {/* Icon & Emoji */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <benefit.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <motion.span
                                            className="text-2xl"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        >
                                            {benefit.emoji}
                                        </motion.span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors pr-16">
                                        {benefit.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Decorative corner element */}
                                <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA hint */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground">
                        Join <span className="text-primary font-semibold">2700+</span> clients who chose professional guidance for their debt concerns
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
