import { motion } from "framer-motion";
import { Shield, Users, Target, Award, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Value {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
}

const values: Value[] = [
    {
        id: "ethical",
        title: "Ethical & Transparent",
        description: "We believe in complete transparency. No hidden fees, no false promises, just honest advisory.",
        icon: Shield,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "client-first",
        title: "Client-Centric Approach",
        description: "Your financial well-being is our priority. We provide personalized solutions tailored to your situation.",
        icon: Users,
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        id: "expert",
        title: "Expert Guidance",
        description: "Our team has 10+ years of combined experience in debt advisory and financial consulting.",
        icon: Award,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        id: "results",
        title: "Results-Driven",
        description: "98% client satisfaction rate. We focus on achieving the best possible outcomes for our clients.",
        icon: Target,
        gradient: "from-amber-500 to-orange-500",
    },
];

export function AboutUsSection() {
    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots-pattern opacity-20" />

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
                        <span className="text-sm font-medium text-primary">About Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Who We{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Are
                        </span>
                    </h2>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="glass-card-strong p-8 rounded-3xl shadow-xl">
                            <h3 className="text-3xl font-bold mb-6 text-foreground">
                                Independent Unsecured Loan Advisory Consultancy
                            </h3>

                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    <Link to="/how-it-works" className="font-semibold text-foreground hover:text-primary transition-colors">FairPay Solution</Link> is an independent unsecured loan advisory consultancy created to support borrowers facing financial stress and recovery-related challenges.
                                </p>

                                <p>
                                    We focus on <Link to="/how-it-works" className="text-primary font-semibold hover:underline">borrower education</Link>, <Link to="/dashboard/harassment" className="text-primary font-semibold hover:underline">legal awareness</Link>, and <Link to="/dashboard" className="text-primary font-semibold hover:underline">structured guidance</Link> — enabling clients to engage with lenders lawfully and confidently.
                                </p>

                                <p className="text-sm italic border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
                                    We are not a bank, NBFC, or lending institution. All services are advisory in nature. View our <Link to="/loan-policy" className="underline">Loan Type Policy</Link>.
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="mt-8 space-y-3">
                                {[
                                    "3+ years of combined industry experience",
                                    "2500+ clients successfully guided",
                                    "₹50 Cr+ debt resolved through our advisory",
                                    "98% client satisfaction rate",
                                ].map((point, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-foreground font-medium">{point}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Mission & Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Mission */}
                        <div className="glass-card-strong p-8 rounded-3xl shadow-xl border-2 border-primary/20">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To empower borrowers with knowledge, protect their rights, and provide ethical guidance through the debt resolution process. We believe informed borrowers make better financial decisions.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="glass-card-strong p-8 rounded-3xl shadow-xl border-2 border-secondary/20">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To become India's most trusted debt advisory platform, known for transparency, ethical practices, and client-first approach. We envision a future where every borrower knows their rights.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Our Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="glass-card-strong p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                                >
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg",
                                            value.gradient
                                        )}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                        {value.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Important Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card-strong p-8 rounded-3xl shadow-xl border-2 border-amber-500/20 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Shield className="w-6 h-6 text-amber-600" />
                        <h3 className="text-xl font-bold text-foreground">Important Notice</h3>
                    </div>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        FairPay Solution is an independent advisory consultancy. We are <span className="font-semibold text-foreground">not a bank, NBFC, or lending institution</span>. We do not provide loans, credit, or financial products. Our services are purely advisory and educational in nature. All consultations are appointment-based. Learn more about <Link to="/eligibility" className="text-primary hover:underline">eligibility</Link> or use our <Link to="/calculator" className="text-primary hover:underline">debt calculator</Link>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
