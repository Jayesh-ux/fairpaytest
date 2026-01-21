
'use client';

import { MessageSquare, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MessagesPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/portal">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Messages</h1>
                    <p className="text-muted-foreground">Chat with your debt resolution experts</p>
                </div>
            </div>

            <Card className="glass-card border-none min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Message Center</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto mt-2">
                            Select a specific case from your dashboard to chat with your case manager about that loan.
                        </p>
                    </div>
                    <Button asChild className="mt-4">
                        <Link href="/portal/tickets">
                            Go to My Cases
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
