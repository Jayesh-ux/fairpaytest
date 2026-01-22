'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Check, Phone, Loader2 } from 'lucide-react';

export const EmergencyStickyBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const [error, setError] = useState('');

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
                    color: '#DC2626', // Red-600
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
            setIsSubmitting(false); // Only stop loading if error occurred before modal open
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none flex justify-center items-end">
            <div className="pointer-events-auto w-full max-w-4xl">
                <AnimatePresence>
                    {!isExpanded ? (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="bg-red-600 text-white rounded-t-xl shadow-2xl overflow-hidden cursor-pointer hover:bg-red-700 transition-colors"
                            onClick={() => setIsExpanded(true)}
                        >
                            <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="p-2 bg-white/20 rounded-full animate-pulse shrink-0">
                                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base sm:text-lg leading-tight">Emergency Consultation</span>
                                        <span className="text-xs sm:text-sm text-red-100">Talk to expert • ₹200 Fee</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsExpanded(true);
                                        }}
                                        className="bg-white text-red-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex-1 sm:flex-none text-center"
                                    >
                                        Request Call
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                                        className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="bg-white dark:bg-zinc-900 border-t-4 border-red-600 rounded-t-xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                            Emergency Support
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Priority call handling for urgent cases.
                                        </p>
                                        <p className="text-[10px] sm:text-sm font-medium text-red-600 mt-2 bg-red-50 dark:bg-red-900/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
                                            Fee: ₹200 (Payable now)
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                    </button>
                                </div>

                                {isSuccess ? (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 sm:p-8 text-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-300" />
                                        </div>
                                        <h4 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300 mb-2">Request Received!</h4>
                                        <p className="text-sm sm:text-base text-green-600 dark:text-green-400">
                                            Our emergency consultant has been notified. We will contact you shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 bg-gray-50 dark:bg-zinc-800/50 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-zinc-800">
                                        {error && (
                                            <div className="md:col-span-3 bg-red-50 text-red-600 p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Your Name *</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                                            <input
                                                type="tel"
                                                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-1.5 sm:space-y-2">
                                            <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Brief Message (Optional)</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Describe your emergency..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsExpanded(false)}
                                                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-red-600 text-white px-6 sm:px-8 py-1.5 sm:py-2 text-sm rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        Request Emergency Call
                                                    </>
                                                )}
                                            </button>
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
