import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQ[] = [
    {
        id: "guarantee",
        question: "Do you guarantee loan settlement or closure?",
        answer: "No. We provide advisory support only. FairPay Solution is a consultancy service that educates borrowers about their rights, options, and guides them through the debt resolution process. We do not guarantee specific outcomes as settlement depends on multiple factors including lender policies, your financial situation, and negotiation outcomes.",
        category: "Services",
    },
    {
        id: "cibil",
        question: "Will my CIBIL score be affected?",
        answer: "Yes, settlement or restructuring may impact your credit score. When you settle a loan for less than the full amount, it is typically reported to credit bureaus as 'settled' rather than 'paid in full,' which can lower your CIBIL score. However, we provide guidance on credit rebuilding strategies post-settlement. It's important to understand this trade-off before proceeding.",
        category: "Credit Score",
    },
    {
        id: "rbi-approved",
        question: "Are you RBI approved?",
        answer: "No. We follow applicable RBI guidelines but are not RBI regulated. FairPay Solution is an independent advisory consultancy. We stay updated with RBI's Fair Practices Code and educate our clients about their rights under these guidelines. We are not a bank, NBFC, or lending institution.",
        category: "Compliance",
    },
    {
        id: "loan-types",
        question: "What types of loans do you assist with?",
        answer: "We assist only with unsecured loans including Personal Loans, Credit Card Dues, Digital App Loans, and NBFC Unsecured Loans. We do NOT assist with secured loans such as Home Loans, Car Loans, Gold Loans, or Property Loans. Our expertise is specifically in unsecured debt advisory.",
        category: "Services",
    },
    {
        id: "process-time",
        question: "How long does the debt resolution process take?",
        answer: "The timeline varies based on individual circumstances, typically ranging from 12 to 24 months. Factors affecting duration include: the number of loans, total debt amount, your repayment capacity, lender cooperation, and negotiation complexity. We provide realistic timelines during your initial consultation based on your specific situation.",
        category: "Process",
    },
    {
        id: "fees",
        question: "What are your consultation fees?",
        answer: "We offer a free initial consultation to understand your situation and explain our services. Our advisory fees are transparent and discussed upfront during the consultation. Fee structure depends on the complexity of your case and the level of support required. We believe in complete transparency with no hidden charges.",
        category: "Fees",
    },
    {
        id: "harassment-stop",
        question: "Can you stop recovery harassment immediately?",
        answer: "We educate you about your legal rights and guide you on how to handle harassment according to RBI guidelines. While we cannot directly stop calls, we provide templates for written complaints, teach you about permissible call hours (7 AM - 7 PM), and guide you through the escalation process to RBI Ombudsman if needed. Knowledge of your rights is your best protection.",
        category: "Harassment",
    },
    {
        id: "legal-action",
        question: "Will I face legal action from lenders?",
        answer: "Legal action is a possibility if loans remain unpaid, but it's not automatic. Many lenders prefer settlement over litigation. We help you understand the legal implications, your rights during legal proceedings, and how to respond appropriately. Our advisory includes guidance on handling legal notices and understanding your options at each stage.",
        category: "Legal",
    },
    {
        id: "confidentiality",
        question: "Is my information kept confidential?",
        answer: "Absolutely. Client confidentiality is paramount. All information shared during consultations is kept strictly confidential and used only for providing advisory services to you. We do not share your personal or financial information with third parties without your explicit consent. We maintain professional standards of privacy and data protection.",
        category: "Privacy",
    },
    {
        id: "appointment",
        question: "How do I book a consultation?",
        answer: "Consultations are strictly appointment-based. You can book by calling us at +91 8449653755, emailing support@fairpaysolution.com, or filling out the callback form on our website. We'll schedule a convenient time for your consultation and send you a confirmation with details of what to prepare.",
        category: "Process",
    },
];

export function EnhancedFAQSection() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))];

    const filteredFaqs = faqs.filter((faq) => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFAQ = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/5 relative overflow-hidden">
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
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Frequently Asked Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Got{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Questions?
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Find answers to common questions about our services, process, and policies
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <div className="glass-card-strong p-6 rounded-2xl shadow-lg mb-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 text-base bg-background/50"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedCategory === category
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {filteredFaqs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-muted-foreground">No questions found matching your search.</p>
                        </motion.div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openId === faq.id;

                            return (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                >
                                    <div
                                        className={cn(
                                            "glass-card-strong rounded-2xl overflow-hidden transition-all duration-300",
                                            isOpen ? "shadow-xl" : "shadow-lg hover:shadow-xl"
                                        )}
                                    >
                                        <button
                                            onClick={() => toggleFAQ(faq.id)}
                                            className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-muted/30 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                        {faq.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-foreground pr-4">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-shrink-0"
                                            >
                                                <ChevronDown className="w-6 h-6 text-primary" />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-6 pt-2">
                                                        <div className="pl-4 border-l-2 border-primary/30">
                                                            <p className="text-muted-foreground leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>

                {/* Still Have Questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="glass-card-strong p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-muted-foreground mb-6">
                            Our expert advisors are here to help. Book a free consultation to get personalized answers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+918449653755"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-glow transition-all"
                            >
                                Call +91 8449653755
                            </a>
                            <a
                                href="mailto:support@fairpaysolution.com"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all"
                            >
                                Email Us
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
