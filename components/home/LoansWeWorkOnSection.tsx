import { motion } from "framer-motion";
import { CheckCircle2, X, CreditCard, Smartphone, Building2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoanType {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    supported: boolean;
}

const loanTypes: LoanType[] = [
    {
        id: "personal",
        name: "Personal Loans",
        description: "Unsecured personal loans from banks and NBFCs",
        icon: CheckCircle2,
        supported: true,
    },
    {
        id: "credit-card",
        name: "Credit Card Dues",
        description: "Outstanding credit card balances and EMIs",
        icon: CreditCard,
        supported: true,
    },
    {
        id: "digital-app",
        name: "Digital App Loans",
        description: "Instant loans from digital lending platforms",
        icon: Smartphone,
        supported: true,
    },
    {
        id: "nbfc",
        name: "NBFC Unsecured Loans",
        description: "Unsecured loans from Non-Banking Financial Companies",
        icon: Building2,
        supported: true,
    },
];

const excludedLoans = [
    "Home Loans",
    "Car Loans",
    "Gold Loans",
    "Property Loans",
    "Mortgage Loans",
    "Secured Business Loans",
];

export function LoansWeWorkOnSection() {
    return (
        <section className="py-20 lg:py-32 bg-transparent relative overflow-hidden">
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
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Loan Types</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Unsecured Loans{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            We Assist With
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        We specialize exclusively in unsecured loan advisory. Here's what we can help you with:
                    </p>
                </motion.div>

                {/* Supported Loans Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {loanTypes.map((loan, index) => {
                        const Icon = loan.icon;
                        return (
                            <motion.div
                                key={loan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group"
                            >
                                <div className="glass-card-strong p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all h-full border-2 border-emerald-500/20">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            <h3 className="text-lg font-bold text-foreground">
                                                {loan.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {loan.description}
                                        </p>
                                    </div>

                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                                        <CheckCircle2 className="w-3 h-3" />
                                        We Assist
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Excluded Loans Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass-card-strong p-8 rounded-3xl shadow-xl border-2 border-red-500/20">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <X className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-foreground">
                                    We Do NOT Assist With Secured Loans
                                </h3>
                                <p className="text-muted-foreground">
                                    Our expertise is specifically in unsecured debt advisory. We do not provide services for the following secured loan types:
                                </p>
                            </div>
                        </div>

                        {/* Excluded List */}
                        <div className="grid md:grid-cols-2 gap-3">
                            {excludedLoans.map((loan, index) => (
                                <motion.div
                                    key={loan}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10"
                                >
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <X className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{loan}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Important Note */}
                        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Important:</strong> Secured loans involve collateral (property, vehicle, gold, etc.) and require specialized legal handling. Our advisory services are designed specifically for unsecured debt resolution.
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Why Unsecured Only? */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl glass-card-strong shadow-lg max-w-2xl">
                        <h4 className="text-xl font-bold text-foreground">Why Do We Focus Only on Unsecured Loans?</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            Unsecured loans have unique characteristics and legal frameworks that differ significantly from secured loans. By specializing exclusively in unsecured debt, we provide focused expertise, better outcomes, and more effective advisory services for our clients.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
