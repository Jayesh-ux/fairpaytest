// News API Service for fetching relevant financial news
// Using NewsAPI.org (Free tier: 100 requests/day)

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        name: string;
    };
    author?: string;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'demo';
// In production, we use a serverless proxy to bypass NewsAPI's localhost restriction
const NEWS_API_BASE_URL = import.meta.env.PROD ? '/api/news' : 'https://newsapi.org/v2';

/**
 * Fetch latest news articles related to finance and business in India
 */
export async function fetchFinancialNews(pageSize: number = 15): Promise<NewsArticle[]> {
    try {
        // India-specific financial news query
        const query = '(India OR Indian OR Mumbai OR Delhi OR RBI OR "Reserve Bank") AND (finance OR business OR economy OR banking OR loan OR debt OR credit OR rupee OR stock OR market)';

        const params = new URLSearchParams({
            q: query,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: '50', // Fetch more to have options after filtering
            apiKey: NEWS_API_KEY
        });

        const fetchUrl = import.meta.env.PROD
            ? `${NEWS_API_BASE_URL}?${params}`
            : `${NEWS_API_BASE_URL}/everything?${params}`;

        const response = await fetch(fetchUrl);

        if (!response.ok) {
            console.warn('NewsAPI request failed:', response.status);
            // Try without domain filter
            return fetchIndianBusinessNews(pageSize);
        }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            console.warn('No articles returned from API');
            return fetchIndianBusinessNews(pageSize);
        }

        console.log(`Fetched ${data.articles.length} articles from Indian sources`);

        // Filter for relevant articles
        const relevantKeywords = [
            'india', 'indian', 'mumbai', 'delhi', 'bangalore', 'rbi', 'rupee',
            'debt', 'loan', 'credit', 'emi', 'finance', 'banking',
            'nbfc', 'settlement', 'interest', 'borrower',
            'economy', 'business', 'financial', 'money', 'nifty', 'sensex'
        ];

        const excludeKeywords = ['cricket', 'football', 'movie', 'film', 'actor', 'actress', 'bollywood'];

        const filteredArticles = data.articles.filter((article: NewsArticle) => {
            if (!article.description || !article.url || article.url === '#') return false;

            const text = `${article.title} ${article.description}`.toLowerCase();

            // Exclude unwanted content
            const hasExcluded = excludeKeywords.some(keyword => text.includes(keyword));
            if (hasExcluded) return false;

            // Must have at least one relevant keyword
            const hasRelevant = relevantKeywords.some(keyword => text.includes(keyword));
            return hasRelevant;
        });

        console.log(`Filtered to ${filteredArticles.length} relevant articles`);

        if (filteredArticles.length >= 5) {
            return filteredArticles.slice(0, pageSize);
        }

        // If we have some articles but not enough, mix with fallback
        if (filteredArticles.length > 0) {
            const fallback = getFallbackArticles();
            return [...filteredArticles, ...fallback].slice(0, pageSize);
        }

        // No good articles, use fallback
        console.warn('Not enough relevant articles, using fallback');
        return getFallbackArticles();
    } catch (error) {
        console.error('Error fetching news:', error);
        return getFallbackArticles();
    }
}

/**
 * Fetch top business headlines from India
 */
export async function fetchIndianBusinessNews(pageSize: number = 15): Promise<NewsArticle[]> {
    try {
        const params = new URLSearchParams({
            country: 'in',
            category: 'business',
            pageSize: pageSize.toString(),
            apiKey: NEWS_API_KEY,
        });

        const fetchUrl = import.meta.env.PROD
            ? `${NEWS_API_BASE_URL}?${params}`
            : `${NEWS_API_BASE_URL}/top-headlines?${params}`;

        const response = await fetch(fetchUrl);

        if (!response.ok) {
            return getFallbackArticles();
        }

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return getFallbackArticles();
        }

        // Filter out articles without proper URLs
        const validArticles = data.articles.filter((article: NewsArticle) =>
            article.url && article.url !== '#' && article.description
        );

        return validArticles.length > 0 ? validArticles : getFallbackArticles();
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return getFallbackArticles();
    }
}

/**
 * Fallback articles when API is unavailable
 */
function getFallbackArticles(): NewsArticle[] {
    return [
        {
            title: "RBI Issues New Guidelines on Fair Debt Collection Practices for NBFCs",
            description: "The Reserve Bank of India has released comprehensive guidelines for Non-Banking Financial Companies on ethical debt recovery practices. The new framework aims to protect borrowers from harassment while ensuring legitimate recovery rights for lenders.",
            url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx",
            urlToImage: "https://picsum.photos/seed/rbi-guidelines/800/450",
            publishedAt: new Date().toISOString(),
            source: { name: "FairPaySolution Insights" },
            author: "Financial Regulatory Team"
        },
        {
            title: "Understanding Debt Settlement: A Complete Guide for Indian Borrowers",
            description: "Learn about the legal framework and best practices for debt settlement in India. This comprehensive guide covers your rights as a borrower, negotiation strategies, and how to work with creditors to reduce your outstanding debt legally.",
            url: "/how-it-works",
            urlToImage: "https://picsum.photos/seed/debt-settlement/800/450",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: "FairPaySolution Insights" },
            author: "Debt Relief Expert Team"
        },
        {
            title: "Credit Card Debt in India: What Borrowers Need to Know",
            description: "Recent data shows credit card outstanding has surged to unprecedented levels. Financial experts discuss the implications for borrowers and share strategies for managing credit card debt effectively.",
            url: "/calculator",
            urlToImage: "https://picsum.photos/seed/credit-card-debt/800/450",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: "FairPaySolution Insights" },
            author: "Credit Analysis Team"
        }
    ];
}

/**
 * Cache news articles in localStorage to reduce API calls
 */
const CACHE_KEY = 'fairpay_news_cache';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours (reduced from 6)

export async function getCachedNews(): Promise<NewsArticle[]> {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { articles, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log('Using cached news articles');
                return articles;
            }
        }
    } catch (error) {
        console.error('Error reading cache:', error);
    }

    // Fetch fresh news - try business headlines first, then general finance
    console.log('Fetching fresh news from API...');
    let articles = await fetchIndianBusinessNews(15);

    // If business news didn't return enough, try general finance search
    if (articles.length < 10) {
        console.log('Not enough business headlines, trying general finance search...');
        articles = await fetchFinancialNews(15);
    }

    // Cache the results
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            articles,
            timestamp: Date.now()
        }));
        console.log(`Cached ${articles.length} articles`);
    } catch (error) {
        console.error('Error writing cache:', error);
    }

    return articles;
}
