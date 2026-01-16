import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shield, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function LoanPolicyPage() {
    return (
        <Layout>
            <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen bg-gradient-to-b from-background to-secondary/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" />
                            Loan Type Policy
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Loan Type Policy
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Understanding which loans we can assist with
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Eligible Loans */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        ✅ Eligible Unsecured Loans
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        We provide consultancy services for the following types of unsecured debt:
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Personal Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Unsecured personal loans from banks, NBFCs, and fintech lenders
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Credit Card Debt</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Outstanding balances on credit cards from any issuer
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Business Loans (Unsecured)</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Unsecured business loans without collateral
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Medical Debt</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Unpaid medical bills and healthcare expenses
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Education Loans (Unsecured)</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Student loans without collateral or guarantor
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Payday Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Short-term high-interest loans
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ineligible Loans */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        ❌ Ineligible Secured Loans
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        We do NOT provide services for secured loans or loans with collateral:
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Home Loans / Mortgages</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Loans secured by residential or commercial property
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Car Loans / Vehicle Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Loans secured by automobiles or vehicles
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Gold Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Loans secured by gold jewelry or ornaments
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Property Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Loans against property (LAP) or real estate
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Secured Business Loans</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Business loans with collateral or guarantees
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2">Loan Against Securities</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Loans secured by stocks, bonds, or mutual funds
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Why This Policy */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <AlertCircle className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Why This Policy Exists
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-4 text-muted-foreground">
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Legal and Practical Reasons:</strong> Secured loans involve collateral that can be seized by lenders through legal processes. Settlement strategies that work for unsecured debt are not applicable to secured debt, as lenders have the right to repossess the collateral.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Risk of Asset Loss:</strong> Attempting to negotiate secured debt without proper legal representation could result in loss of your home, vehicle, or other valuable assets. We do not want to put our clients at such risk.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Specialized Expertise Required:</strong> Secured debt resolution requires specialized legal expertise and often involves court proceedings. Our consultancy focuses on unsecured debt where our strategies are most effective.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-foreground">Client Protection:</strong> This policy protects our clients from engaging in services that may not be appropriate for their situation and ensures we only provide guidance where we can genuinely help.
                                </p>
                            </div>
                        </div>

                        {/* Verification Process */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Our Verification Process
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Before accepting any client, we verify:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-primary text-sm font-bold">1</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        The type of debt you have (secured vs. unsecured)
                                    </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-primary text-sm font-bold">2</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Whether your debt falls within our service scope
                                    </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-primary text-sm font-bold">3</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Your eligibility for our debt resolution programs
                                    </p>
                                </li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                If your debt is not eligible for our services, we will inform you immediately and, where possible, refer you to appropriate resources or professionals who can assist you.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="font-semibold text-foreground mb-2">Have Questions About Your Loan Type?</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Not sure if your loan qualifies? Contact us for a free consultation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="tel:+919389815277"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                                >
                                    Call +91 9389815277
                                </a>
                                <a
                                    href="mailto:support@fairpaysolution.com"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
                                >
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
