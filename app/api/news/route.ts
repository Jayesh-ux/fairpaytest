import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get('q');
    const language = searchParams.get('language');
    const sortBy = searchParams.get('sortBy');
    const pageSize = searchParams.get('pageSize');
    const country = searchParams.get('country');
    const category = searchParams.get('category');

    // Check both names for compatibility
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const baseUrl = 'https://newsapi.org/v2';
    const endpoint = country ? 'top-headlines' : 'everything';

    const params = new URLSearchParams();
    // Default search query if none provided
    const searchQuery = q || (country ? '' : 'india finance');
    if (searchQuery) params.append('q', searchQuery);
    if (language) params.append('language', language);
    if (sortBy) params.append('sortBy', sortBy);
    if (pageSize) params.append('pageSize', pageSize);
    if (country) params.append('country', country);
    if (category) params.append('category', category);
    params.append('apiKey', apiKey);

    try {
        const response = await fetch(`${baseUrl}/${endpoint}?${params.toString()}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
            }
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
