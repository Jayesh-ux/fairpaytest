'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Building,
    CreditCard,
    Wallet,
    Home,
    Car,
    GraduationCap,
    HelpCircle,
    IndianRupee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const loanTypes = [
    { id: 'Personal Loan', label: 'Personal Loan', icon: Wallet },
    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard },
    { id: 'Home Loan', label: 'Home Loan', icon: Home },
    { id: 'Car Loan', label: 'Car Loan', icon: Car },
    { id: 'Education Loan', label: 'Education Loan', icon: GraduationCap },
    { id: 'Business Loan', label: 'Business Loan', icon: Building },
    { id: 'Other', label: 'Other', icon: HelpCircle },
];

export default function NewTicketPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        loanType: '',
        lenderName: '',
        loanAmount: '',
    });

    const handleLoanTypeSelect = (type: string) => {
        setFormData({ ...formData, loanType: type });
        setStep(2);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create ticket');
            }

            const ticket = await res.json();
            router.push(`/portal/tickets/${ticket.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <Link
                href="/portal/tickets"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Tickets
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-strong p-6 lg:p-8 rounded-2xl"
            >
                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-8">
                    <div
                        className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        1
                    </div>
                    <div className={cn('flex-1 h-1 rounded', step >= 2 ? 'bg-primary' : 'bg-muted')} />
                    <div
                        className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        2
                    </div>
                </div>

                {step === 1 && (
                    <>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            What type of loan do you need help with?
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Select the type of loan you'd like to resolve
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {loanTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleLoanTypeSelect(type.id)}
                                    className={cn(
                                        'p-4 rounded-xl border-2 transition-all text-left',
                                        formData.loanType === type.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                    )}
                                >
                                    <type.icon className="w-8 h-8 text-primary mb-2" />
                                    <p className="font-semibold text-foreground">{type.label}</p>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">
                                    Loan Details
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    {formData.loanType}
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Lender Name */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Lender / Bank Name
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        name="lenderName"
                                        value={formData.lenderName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., HDFC Bank, ICICI Bank (Optional)"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Loan Amount */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Outstanding Amount
                                </label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="number"
                                        name="loanAmount"
                                        value={formData.loanAmount}
                                        onChange={handleInputChange}
                                        placeholder="Current amount due (Optional)"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    You can add more details later or discuss with your advisor
                                </p>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-6 text-lg font-semibold"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Creating Ticket...
                                    </>
                                ) : (
                                    'Create Ticket'
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
