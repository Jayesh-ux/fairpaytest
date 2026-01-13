import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { q, language, sortBy, pageSize, country, category } = req.query;
    const apiKey = process.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const baseUrl = 'https://newsapi.org/v2';
    const endpoint = country ? 'top-headlines' : 'everything';

    const params = new URLSearchParams();
    // Default search query if none provided to avoid NewsAPI 'parametersMissing' error
    const searchQuery = (q as string) || (country ? '' : 'india finance');
    if (searchQuery) params.append('q', searchQuery);
    if (language) params.append('language', language as string);
    if (sortBy) params.append('sortBy', sortBy as string);
    if (pageSize) params.append('pageSize', pageSize as string);
    if (country) params.append('country', country as string);
    if (category) params.append('category', category as string);
    params.append('apiKey', apiKey);

    try {
        const response = await fetch(`${baseUrl}/${endpoint}?${params.toString()}`);
        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch news' });
    }
}
