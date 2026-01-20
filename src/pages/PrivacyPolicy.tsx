'use client';

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Your Privacy Matters</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Last Updated: January 13, 2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="prose prose-lg dark:prose-invert max-w-none"
                        >
                            {/* Introduction */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <p className="text-muted-foreground leading-relaxed">
                                    fairpaysolution.com ("FairPaySolution," "we," or "us") is committed to protecting your privacy. We take data protection and privacy very seriously. This Privacy Policy ("Policy") describes how FairPaySolution collects, uses, shares and secures the personal information you provide when you visit the Websites and Mobile Apps owned and operated by FairPaySolution, and when you use our Service(s). It also describes your choices regarding use, access and correction of your personal information. The use of information collected through our Service(s) shall be limited to the purpose of providing the service for which you have engaged FairPaySolution.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Please read this Privacy Policy carefully, as it governs how you use FairPaySolution or its affiliate products. If you do not agree to this Privacy Policy, please do not use FairPaySolution.
                                </p>
                                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mt-6">
                                    <p className="text-sm font-medium text-foreground">
                                        <strong>Note:</strong> Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.
                                    </p>
                                </div>
                            </div>

                            {/* Section 1 */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Database className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        1. Collection of Personally Identifiable Information
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    We collect personally identifiable information (email address, name, phone number, etc.) from you when you set up a free account with fairpaysolution.com or choose to fill out a call back/program registration form. We may collect the following personal information from you when you visit our website or mobile apps and voluntarily provide the following information via one of our contact forms, via a chat or phone session, or as part of a purchase of one of our services or register on our site:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Contact Information such as name, email address, mailing address, phone number, IP</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Information about your debt, such as loan amount, loan type, financial situation</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Billing Information, such as payment details and billing address</span>
                                    </li>
                                </ul>
                                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mt-6">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Note:</strong> All payment transactions are processed through secure payment gateway providers. We do not store any card information (other than the last 4 digits of your card) in our servers. We reserve the right to contact you on the information provided, both email and mobile phone numbers, for the purpose of providing information and services of FairPaySolution. This may require us to contact you on your number even if it is listed on the DND list. In addition, we may use your contact information to send you e-mailers/offers relevant to you, unless explicitly opted out by you.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Eye className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        2. Use of Non-Personal Identifiable Data
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    We capture some Non Identifiable data in our logs. The data in the logs may include:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Device type</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Browser type</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Language preference</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Time zone</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Screen size</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="text-muted-foreground">Referring / exit pages</span>
                                    </li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-6">
                                    We may use the personal information collected from within the Websites or when you use the Service(s) to:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Provide you with the Service(s)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Send you communication from the Service(s)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Assess the needs or suggest suitable products</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Send you requested product or service information</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Respond to customer service requests</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Administer your account</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Send you promotional and marketing communications</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Personalised Advertisement</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span className="text-muted-foreground">Perform statistical analyses of user behaviour and characteristics at an aggregate level</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Section 3 - Cookies */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Lock className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        3. Cookies
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    FairPaySolution and our third-party partners, such as our advertising and analytics partners use cookies and other tracking technologies (e.g., web beacons, device identifiers and pixels) to provide functionality and to recognize you across different Services and devices. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since each browser is different, look at your browser's Help Menu to learn the correct way to modify your cookies. If you turn cookies off, some of the features that make your site experience more efficient may not function properly. If you want to opt out of cookies or data sharing you can e-mail us at{" "}
                                    <a href="mailto:support@fairpaysolution.com" className="text-primary hover:underline">
                                        support@fairpaysolution.com
                                    </a>
                                    .
                                </p>
                            </div>

                            {/* Section 4 - Sharing */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <UserCheck className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        4. Sharing of Personal Information
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may share personal information with our other corporate entities and affiliates to: help detect and prevent identity theft, fraud and other potentially illegal acts; correlate related or multiple accounts to prevent abuse of our services; and to facilitate joint or co-branded services that you request where such services are provided by more than one corporate entity. Those entities and affiliates may not market to you as a result of such sharing unless you explicitly opt-in.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    We may disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    FairPaySolution.com and its affiliates will share some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity. Should such a transaction occur, that other business entity (or the new combined entity) will be required to follow this privacy policy with respect to your personal information.
                                </p>
                            </div>

                            {/* Section 5 - Security */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        5. Information Security
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our Websites and Service(s) have industry standard security measures in place to protect against the loss, misuse, and alteration of the information under our control. When you provide us with sensitive information (such as payment information or login credentials), we will encrypt that information via Secure Socket Layer (SSL).
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our Websites or via the Service(s) and any transmission is at your own risk. Once we receive your personal information, we will use strict procedures and security features to try to prevent unauthorised access.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site. Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. All payment transactions are processed through secure gateway providers and are not stored or processed on our servers.
                                </p>
                            </div>

                            {/* Section 6 - Contact */}
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 shadow-lg border border-primary/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        6. Contact Us
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Questions regarding this Privacy Policy should be directed to:{" "}
                                    <a href="mailto:support@fairpaysolution.com" className="text-primary hover:underline font-medium">
                                        support@fairpaysolution.com
                                    </a>
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Or call us at:{" "}
                                    <a href="tel:+919389815277" className="text-primary hover:underline font-medium">
                                        +91 9389815277
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
