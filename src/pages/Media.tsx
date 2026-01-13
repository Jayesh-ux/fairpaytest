import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, TrendingUp, Calendar } from "lucide-react";

interface MediaArticle {
    title: string;
    source: string;
    date: string;
    url: string;
    category: string;
}

const mediaArticles: MediaArticle[] = [
    {
        title: "Understanding Debt Relief Options in India: A Comprehensive Guide",
        source: "Financial Express",
        date: "January 2026",
        url: "#",
        category: "Debt Relief"
    },
    {
        title: "How to Legally Settle Credit Card Debt in India",
        source: "Economic Times",
        date: "December 2025",
        url: "#",
        category: "Credit Cards"
    },
    {
        title: "Borrower Rights: What You Need to Know About Loan Recovery",
        source: "Money Control",
        date: "December 2025",
        url: "#",
        category: "Legal Rights"
    },
    {
        title: "The Rise of Debt Settlement Services in India",
        source: "Business Standard",
        date: "November 2025",
        url: "#",
        category: "Industry Trends"
    },
    {
        title: "Protecting Yourself from Aggressive Loan Recovery Tactics",
        source: "India Today",
        date: "November 2025",
        url: "#",
        category: "Consumer Protection"
    },
    {
        title: "RBI Guidelines on Fair Debt Collection Practices",
        source: "The Hindu Business Line",
        date: "October 2025",
        url: "#",
        category: "Regulations"
    },
];

const categories = ["All", "Debt Relief", "Credit Cards", "Legal Rights", "Industry Trends", "Consumer Protection", "Regulations"];

export default function MediaPage() {
    return (
        <Layout>
            <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen bg-gradient-to-b from-background to-secondary/5">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Newspaper className="w-4 h-4" />
                            Media & Resources
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Media Coverage & Insights
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Stay informed with the latest news, insights, and expert opinions on debt relief and financial wellness in India.
                        </p>
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-3 justify-center mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === "All"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Featured Article */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass-card-strong rounded-2xl p-8 md:p-12 mb-12"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                Featured
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                                Trending
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            The Complete Guide to Debt Settlement in India 2026
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            Everything you need to know about legally settling your unsecured debts, understanding your rights as a borrower, and navigating the debt resolution process in India.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>January 13, 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                <span>15 min read</span>
                            </div>
                        </div>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold">
                            Read Full Article
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mediaArticles.map((article, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            >
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block glass-card-strong rounded-xl p-6 h-full hover:shadow-xl transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                            {article.category}
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span className="font-medium">{article.source}</span>
                                        <span>{article.date}</span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Resources Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                            Helpful Resources
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="glass-card-strong rounded-xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Debt Relief Guide
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Comprehensive guide to understanding debt relief options available in India.
                                </p>
                                <a href="/how-it-works" className="text-primary hover:underline font-semibold text-sm">
                                    Learn More →
                                </a>
                            </div>

                            <div className="glass-card-strong rounded-xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="text-2xl">⚖️</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Borrower Rights
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Know your legal rights as a borrower under Indian law and RBI guidelines.
                                </p>
                                <a href="/how-it-works" className="text-primary hover:underline font-semibold text-sm">
                                    Learn More →
                                </a>
                            </div>

                            <div className="glass-card-strong rounded-xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Savings Calculator
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Calculate your potential savings with our AI-powered debt settlement calculator.
                                </p>
                                <a href="/calculator" className="text-primary hover:underline font-semibold text-sm">
                                    Calculate Now →
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Newsletter Signup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="mt-16 glass-card-strong rounded-2xl p-8 md:p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Subscribe to our newsletter for the latest insights on debt relief, financial wellness, and borrower rights in India.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </motion.div>

                    {/* Disclaimer */}
                    <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Note:</strong> External articles are provided for informational purposes only. FairPaySolution is not responsible for the content of third-party websites.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
