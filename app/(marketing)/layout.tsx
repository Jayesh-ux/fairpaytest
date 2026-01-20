'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CallbackPopup } from '@/components/CallbackPopup';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col">
            <Header onOpenCallback={() => setIsCallbackOpen(true)} />
            <main className="flex-1">{children}</main>
            <Footer />
            <CallbackPopup
                isOpen={isCallbackOpen}
                onClose={() => setIsCallbackOpen(false)}
            />
        </div>
    );
}
