import { NextResponse } from 'next/server';

export async function GET() {
    return new NextResponse('google-site-verification: google0a9ebcf8567c9895.html', {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
