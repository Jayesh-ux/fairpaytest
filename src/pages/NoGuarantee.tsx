'use client';

import { motion } from "framer-motion";
import { AlertTriangle, Info, TrendingDown, Scale } from "lucide-react";

export default function NoGuaranteePage() {
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
                            Important Notice
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            No Guarantee Policy
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Understanding realistic expectations for debt resolution
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Main Policy */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <Scale className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Our Commitment to Transparency
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        At FairPay Solutions, we believe in complete transparency. While we work diligently to help our clients achieve the best possible outcomes, we cannot and do not guarantee specific results in debt resolution matters.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* What We Cannot Guarantee */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                What We Cannot Guarantee
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Specific Settlement Amounts</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee that your debt will be settled for a specific amount or percentage. Settlement amounts depend on creditor policies, your financial situation, and negotiation outcomes.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Creditor Acceptance</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee that creditors will accept settlement offers or agree to negotiate. Creditors have the right to pursue full payment through legal means.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Prevention of Legal Action</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee that creditors will not pursue legal action, file lawsuits, or obtain judgments against you during the debt resolution process.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Credit Score Improvement</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee improvement in your credit score. Debt settlement may negatively impact your credit score, and settled accounts may remain on your credit report for years.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Specific Timelines</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee how long the debt resolution process will take. Timelines vary based on creditor responsiveness, your financial situation, and other factors.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Elimination of All Debt</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee that all your debts will be eliminated or that you will become completely debt-free through our services.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Stop of Collection Calls</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We cannot guarantee that collection calls or communications from creditors will stop. While we provide guidance on your rights, creditors may continue their collection efforts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What We Do Provide */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                What We Do Provide
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Expert Guidance:</strong> Professional advice based on years of experience in debt resolution
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Personalized Strategy:</strong> Customized debt resolution plans based on your unique situation
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Rights Education:</strong> Comprehensive information about your rights as a borrower under Indian law
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Negotiation Support:</strong> Assistance in preparing for and conducting settlement negotiations
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Documentation Help:</strong> Support with organizing documents and communication with creditors
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-emerald-600 text-lg">✓</span>
                                    </div>
                                    <p className="text-muted-foreground">
                                        <strong className="text-foreground">Ongoing Support:</strong> Continuous guidance throughout your debt resolution journey
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Factors Affecting Outcomes */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <Info className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Factors Affecting Debt Resolution Outcomes
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        Debt resolution success depends on multiple factors, many of which are beyond our control:
                                    </p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Individual creditor policies and willingness to negotiate</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Your current financial situation and ability to make payments</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Age and status of your debt accounts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Your commitment to following the recommended strategy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Economic conditions and regulatory changes</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Whether creditors have already initiated legal proceedings</span>
                                </li>
                            </ul>
                        </div>

                        {/* Your Responsibility */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Your Responsibility
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                Successful debt resolution requires your active participation:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Providing accurate and complete information about your debts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Following the recommended strategy and timeline</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Making agreed-upon payments on time</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Communicating promptly about any changes in your situation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Making informed decisions about settlement offers</span>
                                </li>
                            </ul>
                        </div>

                        {/* Acknowledgment */}
                        <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                Important Acknowledgment
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                By engaging our services, you acknowledge that you have read and understood this No Guarantee Policy. You understand that debt resolution outcomes vary and that FairPay Solutions makes no guarantees regarding specific results, timelines, or outcomes.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="font-semibold text-foreground mb-2">Questions About This Policy?</h3>
                            <p className="text-sm text-muted-foreground">
                                If you have questions or concerns about our No Guarantee Policy, please contact us at{" "}
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
