'use client';

import { motion } from "framer-motion";
import { DollarSign, RefreshCw, FileText, AlertCircle, CheckCircle2 } from "lucide-react";

export default function FeesRefundPage() {
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <DollarSign className="w-4 h-4" />
                            Transparent Pricing
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Fees & Refund Policy
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Clear, transparent pricing with fair refund terms
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Fee Structure */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <DollarSign className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Our Fee Structure
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        FairPaySolution operates on a transparent, appointment-based consultancy model. Our fees are clearly communicated upfront before you engage our services.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <h3 className="font-semibold text-foreground mb-2">Consultation Fee</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Initial consultation to assess your situation and determine eligibility.
                                    </p>
                                    <p className="text-primary font-bold">FREE - No Obligation</p>
                                </div>

                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <h3 className="font-semibold text-foreground mb-2">Service Fees</h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Fees for our debt resolution consultancy services vary based on:
                                    </p>
                                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                        <li>• Total debt amount</li>
                                        <li>• Number of creditors</li>
                                        <li>• Complexity of your case</li>
                                        <li>• Services required</li>
                                    </ul>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        <strong className="text-foreground">Fees are disclosed in writing before service commencement.</strong>
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                    <h3 className="font-semibold text-foreground mb-2">Payment Terms</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We offer flexible payment options including:
                                    </p>
                                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                                        <li>• One-time payment</li>
                                        <li>• Installment plans (subject to approval)</li>
                                        <li>• Monthly retainer (for ongoing services)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                What's Included in Our Services
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Debt Analysis</h3>
                                        <p className="text-xs text-muted-foreground">Comprehensive review of your financial situation</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Strategy Development</h3>
                                        <p className="text-xs text-muted-foreground">Personalized debt resolution plan</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Rights Education</h3>
                                        <p className="text-xs text-muted-foreground">Information about borrower rights under Indian law</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Documentation Support</h3>
                                        <p className="text-xs text-muted-foreground">Help with organizing and preparing documents</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Negotiation Guidance</h3>
                                        <p className="text-xs text-muted-foreground">Advice on settlement negotiations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm mb-1">Ongoing Support</h3>
                                        <p className="text-xs text-muted-foreground">Continuous guidance throughout the process</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Refund Policy */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-6">
                                <RefreshCw className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        Refund Policy
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We stand behind the quality of our services. Our refund policy is designed to be fair to both our clients and our business.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span className="text-emerald-600">✓</span>
                                        Cooling-Off Period
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        You have <strong className="text-foreground">7 days</strong> from the date of service agreement to cancel for a full refund, provided no substantial work has been performed.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span className="text-amber-600">⚠</span>
                                        Partial Refunds
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        After the cooling-off period, refunds may be provided on a pro-rata basis for services not yet rendered, minus any work already completed and documented.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span className="text-red-600">✗</span>
                                        Non-Refundable Fees
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        The following are non-refundable:
                                    </p>
                                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                        <li>• Fees for work already completed</li>
                                        <li>• Third-party costs incurred on your behalf</li>
                                        <li>• Administrative and processing fees</li>
                                        <li>• Services rendered more than 30 days ago</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Refund Process */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                How to Request a Refund
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Submit Written Request</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Email your refund request to <a href="mailto:support@fairpaysolution.com" className="text-primary hover:underline">support@fairpaysolution.com</a> with your client ID and reason for refund.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Review Process</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We will review your request within 5-7 business days and respond with our decision.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Refund Processing</h3>
                                        <p className="text-sm text-muted-foreground">
                                            If approved, refunds will be processed within 10-15 business days to your original payment method.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* No Hidden Fees */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <div className="flex items-start gap-3 mb-4">
                                <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-3">
                                        No Hidden Fees
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We believe in complete transparency. All fees are disclosed in writing before you sign any agreement. There are no hidden charges, surprise fees, or undisclosed costs.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Our Promise:</strong> You will receive a detailed fee breakdown before engaging our services. If any additional costs arise during the process, we will inform you immediately and obtain your approval before proceeding.
                                </p>
                            </div>
                        </div>

                        {/* Dispute Resolution */}
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Dispute Resolution
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                If you have any concerns about fees or refunds, we encourage you to:
                            </p>
                            <ol className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold">1.</span>
                                    <p className="text-muted-foreground">
                                        Contact our customer service team to discuss your concerns
                                    </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold">2.</span>
                                    <p className="text-muted-foreground">
                                        Request a review by our management team if not satisfied
                                    </p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary font-bold">3.</span>
                                    <p className="text-muted-foreground">
                                        Seek mediation through appropriate consumer forums if needed
                                    </p>
                                </li>
                            </ol>
                        </div>

                        {/* Important Notes */}
                        <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Important Notes</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Fees are subject to change. Current fees will be communicated at the time of service agreement.</li>
                                        <li>• This policy applies to services purchased directly from FairPaySolution.</li>
                                        <li>• Refund timelines may vary based on your payment method and financial institution.</li>
                                        <li>• We reserve the right to modify this policy with 30 days notice to existing clients.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                            <h3 className="font-semibold text-foreground mb-2">Questions About Fees or Refunds?</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Our team is here to help clarify any questions about our pricing or refund policy.
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
                                    Email Support
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
