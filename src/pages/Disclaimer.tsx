'use client';

import { motion } from "framer-motion";
import { AlertTriangle, Shield, FileText, Info } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <>
            <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen bg-gradient-to-b from-background to-secondary/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6">
                            <AlertTriangle className="w-4 h-4" />
                            Important Information
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Disclaimer
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Last Updated: January 13, 2026
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card-strong rounded-2xl p-8 md:p-12 space-y-8"
                    >
                        {/* Summary Disclaimer */}
                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-8">
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" />
                                Official Disclaimer
                            </h2>
                            <p className="text-muted-foreground leading-relaxed italic mb-4">
                                "FairPay Solutions is a private legal consultancy and debt management firm. We are not a bank, NBFC, or government agency. We do not provide loans or financial aid. Our services are strictly limited to legal advisory, debt counselling, and settlement negotiation on behalf of our clients. While we strive to achieve the best possible outcome, settlement results depend on individual creditor policies and case specifics. We strictly adhere to RBI guidelines regarding fair practices."
                            </p>
                            <a
                                href="/FairpaySolutions disclaimer.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                            >
                                <FileText className="w-4 h-4" />
                                Download Official Disclaimer PDF
                            </a>
                        </div>

                        {/* Not a Lender */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        We Are Not a Bank or Lender
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        FairPay Solutions is an independent consultancy firm providing advisory and educational services related to unsecured debt resolution. We are NOT:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                                        <li>A bank or financial institution</li>
                                        <li>A Non-Banking Financial Company (NBFC)</li>
                                        <li>A lender or credit provider</li>
                                        <li>A collection agency</li>
                                        <li>A law firm (unless explicitly stated)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Consultancy Services Only */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Consultancy Services Only
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Our services are strictly consultancy and advisory in nature. We provide:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                                        <li>Guidance on debt resolution strategies</li>
                                        <li>Education about borrower rights under Indian law</li>
                                        <li>Support in understanding legal options</li>
                                        <li>Assistance in documentation and communication</li>
                                        <li>Advisory on negotiation approaches</li>
                                    </ul>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        We do NOT directly negotiate with creditors on your behalf unless you have explicitly authorized us to do so through a separate agreement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* No Guarantees */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        No Guarantees of Outcome
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        While we strive to provide the best possible guidance, we cannot guarantee:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                                        <li>Specific settlement amounts or percentages</li>
                                        <li>Creditor acceptance of settlement offers</li>
                                        <li>Elimination of all debt</li>
                                        <li>Prevention of legal action by creditors</li>
                                        <li>Improvement in credit scores</li>
                                        <li>Specific timelines for debt resolution</li>
                                    </ul>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        Debt resolution outcomes depend on multiple factors including creditor policies, your financial situation, and negotiation circumstances.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Not Legal Advice */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Not Legal Advice
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Unless provided by a licensed attorney, our services do not constitute legal advice. For specific legal questions or representation, please consult a qualified lawyer licensed to practice in your jurisdiction.
                            </p>
                        </div>

                        {/* Unsecured Loans Only */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Unsecured Loans Only
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our services are designed exclusively for unsecured debt such as:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                                <li>Personal loans</li>
                                <li>Credit card debt</li>
                                <li>Unsecured business loans</li>
                                <li>Medical debt</li>
                            </ul>
                            <p className="text-amber-600 dark:text-amber-400 font-semibold mt-3">
                                ❌ We do NOT assist with secured loans including home loans, car loans, gold loans, or property loans.
                            </p>
                        </div>

                        {/* Impact on Credit Score */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Impact on Credit Score
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Debt settlement may negatively impact your credit score. Settled accounts may be reported to credit bureaus and remain on your credit report for several years. We recommend understanding these implications before proceeding.
                            </p>
                        </div>

                        {/* Tax Implications */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Tax Implications
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Forgiven debt may be considered taxable income under Indian tax laws. We recommend consulting with a qualified tax professional to understand potential tax liabilities.
                            </p>
                        </div>

                        {/* Information Accuracy */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Information Accuracy
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                While we make every effort to provide accurate and up-to-date information, laws and regulations change frequently. The information on our website and in our consultations is for general guidance only and should not be relied upon as definitive.
                            </p>
                        </div>

                        {/* Third-Party Links */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Third-Party Links and Services
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these third parties. Use of third-party services is at your own risk.
                            </p>
                        </div>

                        {/* Client Responsibility */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Client Responsibility
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-3 text-muted-foreground">
                                <li>Providing accurate and complete information</li>
                                <li>Making your own informed decisions</li>
                                <li>Complying with all applicable laws and regulations</li>
                                <li>Communicating with your creditors as required</li>
                                <li>Meeting any payment obligations you agree to</li>
                            </ul>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Limitation of Liability
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                To the fullest extent permitted by law, FairPay Solutions and its officers, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services or reliance on our advice.
                            </p>
                        </div>

                        {/* Changes to Disclaimer */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">
                                Changes to This Disclaimer
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified disclaimer.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="font-semibold text-foreground mb-2">Questions?</h3>
                            <p className="text-sm text-muted-foreground">
                                If you have any questions about this disclaimer, please contact us at{" "}
                                <a href="mailto:support@fairpaysolution.com" className="text-primary hover:underline">
                                    support@fairpaysolution.com
                                </a>{" "}
                                or call{" "}
                                <a href="tel:+919389815277" className="text-primary hover:underline">
                                    +91 9389815277
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
