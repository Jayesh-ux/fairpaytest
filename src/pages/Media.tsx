import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { getCachedNews, type NewsArticle } from "@/services/newsService";

const categories = ["All", "Debt Relief", "Credit Cards", "Legal Rights", "Industry Trends", "Consumer Protection", "Regulations"];

export default function MediaPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async (force: boolean = false) => {
        setLoading(true);
        try {
            const news = await getCachedNews(force);
            setArticles(news);
        } catch (error) {
            console.error("Error loading news:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    };

    // Filter articles based on selected category
    const getFilteredArticles = () => {
        if (selectedCategory === "All") return articles;

        const categoryKeywords: Record<string, string[]> = {
            "Debt Relief": ["debt", "settlement", "relief", "restructuring", "waiver"],
            "Credit Cards": ["credit card", "card", "credit"],
            "Legal Rights": ["legal", "rights", "law", "court", "regulation", "rbi"],
            "Industry Trends": ["trend", "market", "industry", "sector", "growth"],
            "Consumer Protection": ["consumer", "protection", "fraud", "scam", "harassment"],
            "Regulations": ["regulation", "rbi", "policy", "guideline", "compliance", "reserve bank"]
        };

        const keywords = categoryKeywords[selectedCategory] || [];

        return articles.filter(article => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            return keywords.some(keyword => text.includes(keyword.toLowerCase()));
        });
    };

    const filteredArticles = getFilteredArticles();

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
                            Live Financial News
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Latest Debt & Finance News
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Stay informed with the latest news, insights, and expert opinions on debt relief and financial wellness in India.
                        </p>
                        <button
                            onClick={() => loadNews(true)}
                            disabled={loading}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Updating...' : 'Refresh News'}
                        </button>
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
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === selectedCategory
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Featured Article */}
                    {filteredArticles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="glass-card-strong rounded-2xl p-8 md:p-12 mb-12"
                        >
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                            Featured
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
                                            Latest
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                        {filteredArticles[0].title}
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-6">
                                        {filteredArticles[0].description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(filteredArticles[0].publishedAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Newspaper className="w-4 h-4" />
                                            <span>{filteredArticles[0].source.name}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={filteredArticles[0].url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                                    >
                                        Read Full Article
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                                {filteredArticles[0].urlToImage && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                                        <img
                                            src={filteredArticles[0].urlToImage}
                                            alt={filteredArticles[0].title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.parentElement?.style.setProperty('display', 'none');
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-muted-foreground">Loading latest news...</p>
                        </div>
                    )}

                    {/* Articles Grid */}
                    {!loading && articles.length > 1 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredArticles.slice(1).map((article, index) => (
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
                                        {article.urlToImage && (
                                            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                {article.source.name}
                                            </span>
                                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{formatDate(article.publishedAt)}</span>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    )}

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
                                    Calculate your potential savings with our simple debt settlement calculator.
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
                            <strong className="text-foreground">Note:</strong> News articles are automatically curated from trusted sources. FairPaySolution is not responsible for the content of third-party websites. Articles are filtered to show debt, finance, and loan-related content only.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

