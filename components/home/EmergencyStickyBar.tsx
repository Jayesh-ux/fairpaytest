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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/emergency', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsSuccess(true);
                setFormData({ name: '', phone: '', message: '' });
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsExpanded(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error submitting emergency contact:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center items-end">
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
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-full animate-pulse">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-lg">Emergency Consultation</span>
                                        <span className="text-sm text-red-100">Talk to an expert immediately • ₹200 Consultation Fee</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                        Request Call
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="bg-white dark:bg-zinc-900 border-t-4 border-red-600 rounded-t-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                            <AlertCircle className="w-6 h-6 text-red-600" />
                                            Emergency Priority Support
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                                            Priority call handling for urgent debt harassment cases. A consultant will call you shortly.
                                        </p>
                                        <p className="text-sm font-medium text-red-600 mt-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full inline-block">
                                            Consultation Fee: ₹200 (Payable after connection)
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>

                                {isSuccess ? (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
                                        </div>
                                        <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Request Received!</h4>
                                        <p className="text-green-600 dark:text-green-400">
                                            Our emergency consultant has been notified. We will contact you shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-gray-100 dark:border-zinc-800">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brief Message (Optional)</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Describe your emergency..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsExpanded(false)}
                                                className="px-6 py-2 rounded-lg text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-red-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Phone className="w-5 h-5" />
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
