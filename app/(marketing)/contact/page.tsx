'use client';

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/callbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    source: 'Contact Page',
                    notes: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`
                }),
            });

            if (!response.ok) throw new Error('Failed to send');

            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            toast.success("Message sent successfully!");

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('There was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <MessageSquare className="w-4 h-4" />
                        Get in Touch
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Contact Us
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Have questions about debt resolution? Our expert team is here to help you find the right solution.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="glass-card-strong rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                                        <a
                                            href="tel:+919389815277"
                                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                                        >
                                            +91 9389815277
                                        </a>
                                        <p className="text-sm text-muted-foreground mt-1 font-medium">
                                            Mon-Sat: 9:00 AM - 7:00 PM IST
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                                        <div className="flex flex-col gap-1">
                                            <a href="mailto:support@fairpaysolution.com" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                                                support@fairpaysolution.com
                                            </a>
                                            <a href="mailto:info@fairpaysolution.com" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                                                info@fairpaysolution.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Main Office</h3>
                                        <p className="text-muted-foreground font-medium">
                                            Agra, Uttar Pradesh 282007, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong className="text-foreground">Privacy Note:</strong> Your data is secure with us. We never share your personal information with unauthorized third parties.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="glass-card-strong rounded-2xl p-8 relative overflow-hidden">
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                We'll get back to you within 24 business hours.
                            </p>

                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-primary/5 rounded-2xl p-10 text-center border border-primary/20"
                                >
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircleIcon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-8">
                                        Thank you for reaching out. A representative will contact you shortly.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSuccess(false)}
                                        className="rounded-xl"
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="+91 99999 99999"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                                        <select
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/5 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        >
                                            <option value="" className="bg-[#121214]">Select subject</option>
                                            <option value="General Inquiry" className="bg-[#121214]">General Inquiry</option>
                                            <option value="Debt Settlement" className="bg-[#121214]">Debt Settlement</option>
                                            <option value="Credit Harassment" className="bg-[#121214]">Credit Harassment</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            placeholder="Your message here..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CheckCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}
