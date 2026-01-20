import type { Metadata } from 'next';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://www.fairpaysolution.com'),
    title: {
        default: 'FairPay Solutions | Expert Debt Settlement & Relief in India',
        template: '%s | FairPay Solutions',
    },
    description:
        'Ethical Unsecured Loan Resolution – Expert guidance for lawful, transparent, and structured debt resolution. Free consultation available. We are not a bank or lender; consultancy services only.',
    keywords: [
        'debt settlement India',
        'loan settlement',
        'credit card settlement',
        'personal loan relief',
        'debt relief',
        'stop recovery calls',
        'CIBIL improvement',
        'FairPay Solutions',
        'legal debt consultancy',
        'RBI guidelines',
        'harassment protection',
    ],
    authors: [{ name: 'FairPay Solutions' }],
    creator: 'FairPay Solutions',
    publisher: 'FairPay Solutions',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://www.fairpaysolution.com/',
        siteName: 'FairPay Solutions',
        title: 'FairPay Solutions | Expert Debt Settlement & Relief in India',
        description:
            'Legal consultancy for debt relief in India. Reduce personal loan and credit card debt by 40-60%. Professional RBI-compliant guidance.',
        images: [
            {
                url: '/logo.jpg',
                width: 200,
                height: 200,
                alt: 'FairPay Solutions Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FairPay Solutions | Expert Debt Settlement & Relief in India',
        description:
            'Legal debt settlement guidance in India. Reduce loans by 40-60%. Professional RBI-compliant advisors.',
        images: ['/logo.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/logo.jpg',
        shortcut: '/logo.jpg',
        apple: '/logo.jpg',
    },
    manifest: '/manifest.json',
};

// JSON-LD structured data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FairPay Solutions',
    alternateName: 'FairPay Solution',
    url: 'https://www.fairpaysolution.com',
    logo: 'https://www.fairpaysolution.com/logo.jpg',
    description:
        'Legal debt settlement consultancy in India. Professional guidance for loan settlement and debt relief.',
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9389815277',
        contactType: 'customer service',
        email: 'support@fairpaysolution.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
                <link rel="preconnect" href="https://www.google.com" />
                <meta name="theme-color" content="#C9A962" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
