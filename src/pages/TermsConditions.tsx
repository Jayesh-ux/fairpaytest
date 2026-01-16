import { motion } from "framer-motion";
import { FileText, AlertTriangle, Shield, DollarSign, RefreshCw, Scale } from "lucide-react";

export default function TermsConditions() {
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
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Terms and Conditions
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
                                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                                    Please read the following carefully
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These terms and conditions ("Terms and Conditions") control your use of this website fairpaysolution.com ("Website"). In these Terms and Conditions, "FairPaySolution" is referred to as the "Company", "us," or "we."
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    By using this website or its Products and Services, You Agree and Warrant that you have read, understood, and agreed to be Bound by these terms. Company's privacy policy can be found at Privacy Policy. If you do not accept these terms, you must not use - and are not authorized to use - all or any portion of the company's website and its products or services (as defined below).
                                </p>
                                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mt-6">
                                    <p className="text-sm font-medium text-foreground">
                                        Please read them carefully before you use the services of this site.
                                    </p>
                                </div>
                            </div>

                            {/* General Terms */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Scale className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        General Terms
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">You should not use this site in an unlawful manner; you must respect the website terms and conditions and follow the Privacy Policy.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Under no situations or circumstances, will the company be liable for any change in the content which it provides on the website through its products and services, including but not limited to any errors, omissions, loss, or damage experienced in connection with the use of exposure, any content made available via our products, services, or various resources such as email, blog etc.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">We are not responsible for the charges incurred for the usage of hardware, software, or internet services provider fee. Also, the user is fully responsible for the proper functioning of computer hardware and internet access.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">You will be required to use login credentials for some of the sections on the site and the company reserves the right to block access to our services for any user who does not follow these conditions.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">We make sure that users get uninterrupted access to our service, but there is no obligation to do so. We are not responsible and is not obligated for issues in your network or server beyond certain limits.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Website Usage Guidelines */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        Website Usage Guidelines
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not insult, abuse, harass, stalk, threaten, or otherwise infringe the rights of others;</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not publish, post, distribute or disseminate any defamatory, infringing, indecent, offensive or unlawful material or information.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not upload, install, transfer files which are protected by Intellectual Property Laws or software which affect other computers.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">It's prohibited to edit HTML source code, reverse engineer or attempt to hack.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not run Spam services/scripts or anything which could affect the infrastructure, and in turn, the users.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not communicate spam, advertise, or sell services such as digital downloads, eBooks, or phishing links.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">You may not copy, distribute, and indulge in plagiarism with website content or user submitted content.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                                        <span className="text-muted-foreground">Do not use any content which violates any legal, regulatory, Governmental or network operator conditions or codes of practice.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Limit of Liability */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        Limit of Liability
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    You expressly understand and agree that the Company shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including, damages for loss of profits, goodwill, use, data or other intangible losses (even if the Company has been advised of the possibility of such damages), resulting from:
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">(i)</span>
                                        <span className="text-muted-foreground">the use or the inability to use the service;</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">(ii)</span>
                                        <span className="text-muted-foreground">the cost of procurement of substitute goods and services resulting from any goods, or services purchases or obtained or messages received or transactions entered into through or from the Website or otherwise;</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">(iii)</span>
                                        <span className="text-muted-foreground">unauthorized access to or alteration of your transmissions or data or confidential information;</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">(iv)</span>
                                        <span className="text-muted-foreground">statements or conduct of any third party on the Products;</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">(v)</span>
                                        <span className="text-muted-foreground">or any other matter relating to the Products.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Indemnification */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        Indemnification
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    You agree to indemnify and hold the Company and our subsidiaries, affiliates, officers, directors, agents, and employees, harmless from any claim or demand (including legal expenses and the expenses of other professionals) made by a third party due to or arising out of your breach of this Terms of Use or the documents it incorporates by reference, or your violation of any law or the rights of a third party.
                                </p>
                            </div>

                            {/* Fees */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        Fees
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    FairPaySolution.com services are chargeable, and you are responsible for any fees that may be applicable to programs or usage of our services. You will be notified of such fees prior to completion of the transaction. Only if you consent and choose to pay the mentioned fees, shall the transaction processing go ahead.
                                </p>
                            </div>

                            {/* Refunds */}
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <RefreshCw className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground m-0">
                                        Refunds
                                    </h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Clients pay our service fee on monthly basis (in advance for each month). You can cancel the service any time and no fee is charged after cancellation. Fees already paid is non-refundable.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 shadow-lg border border-primary/20">
                                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                                    Questions or Concerns?
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    For any other information, you can write to us at:{" "}
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
