'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Check, Phone, Loader2, ShieldCheck, Clock, CreditCard } from 'lucide-react';

export const EmergencyStickyBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load Razorpay script dynamically
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim() || !formData.phone.trim()) {
            setError('Please fill in your name and phone number.');
            return;
        }

        if (formData.phone.length < 10) {
            setError('Please enter a valid phone number.');
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Load Razorpay Script
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                setError('Failed to load payment gateway. Check connection.');
                setIsSubmitting(false);
                return;
            }

            // 2. Create Order
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            // 3. Open Razorpay Checkout
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'FairPay Solutions',
                description: 'Emergency Consultation Fee',
                order_id: data.orderId,
                handler: async function (response: any) {
                    // 4. Verify Payment
                    try {
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                contactId: data.id,
                            }),
                        });

                        if (verifyRes.ok) {
                            setIsSuccess(true);
                            setFormData({ name: '', phone: '', message: '' });
                            setTimeout(() => {
                                setIsSuccess(false);
                                setIsExpanded(false);
                            }, 5000);
                        } else {
                            setError('Payment verification failed. Please contact support.');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        setError('Payment verification error.');
                    }
                },
                prefill: {
                    name: formData.name,
                    contact: formData.phone,
                },
                theme: {
                    color: '#e11d48', // Premium Rose-600
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                    }
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Error initiating payment:', error);
            setError('Failed to initiate payment. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end pointer-events-none">
            <div className="pointer-events-auto">
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(true)}
                            className="group relative flex items-center gap-3 bg-white dark:bg-zinc-900 border-2 border-red-100 dark:border-red-900/30 pl-4 pr-2 py-2 rounded-full shadow-xl shadow-red-500/10 hover:shadow-red-500/20 transition-all"
                        >
                            {/* Pulse Effect */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />

                            <div className="flex flex-col items-start mr-2">
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Emergency?</span>
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">Talk to Expert Now</span>
                            </div>

                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                <Phone className="w-5 h-5 animate-pulse" />
                            </div>
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            className="w-[90vw] sm:w-[380px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
                        >
                            {/* Premium Header */}
                            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Agents Online</span>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                                    Priority Consultation
                                </h3>
                                <p className="text-sm text-gray-400 leading-snug">
                                    Skip the queue. Get immediate legal guidance for debt harassment.
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/20">
                                <div className="flex-1 p-2 text-center border-r border-gray-100 dark:border-zinc-800">
                                    <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">
                                        <ShieldCheck className="w-3 h-3 text-red-500" />
                                        Verified Experts
                                    </div>
                                </div>
                                <div className="flex-1 p-2 text-center">
                                    <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase">
                                        <Clock className="w-3 h-3 text-red-500" />
                                        Instant Call
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                {isSuccess ? (
                                    <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Our priority team has received your request. You will receive a call within 5-10 minutes.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {error && (
                                            <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                {error}
                                            </div>
                                        )}

                                        <div className="space-y-3">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                                                />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="Phone Number (+91)"
                                                    className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                                                />
                                            </div>
                                            <div className="relative">
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    placeholder="What's your emergency? (Optional)"
                                                    rows={2}
                                                    className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full group bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white p-3.5 rounded-xl font-bold text-sm shadow-lg shadow-red-500/25 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Pay ₹200 & Connect</span>
                                                        <Phone className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-400">
                                                <CreditCard className="w-3 h-3" />
                                                Secured by Razorpay • 100% Refundable if not resolved
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
