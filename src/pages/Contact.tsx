import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
            const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

            if (scriptUrl) {
                const submissionData = {
                    ...formData,
                    phone: `'${formData.phone}`,
                    formType: "Contact Page",
                    timestamp: new Date().toISOString()
                };

                await fetch(scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submissionData),
                });
            } else {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error sending your message. Please try again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
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
                                    Get in Touch
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
                                                href="tel:+918449653755"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                +91 8449653755
                                            </a>
                                            <p className="text-sm text-muted-foreground mt-1">
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
                                                <a href="mailto:support@fairpaysolution.com" className="text-muted-foreground hover:text-primary transition-colors">
                                                    support@fairpaysolution.com
                                                </a>
                                                <a href="mailto:info@fairpaysolution.com" className="text-muted-foreground hover:text-primary transition-colors">
                                                    info@fairpaysolution.com
                                                </a>
                                                <a href="mailto:hr@fairpaysolution.com" className="text-muted-foreground hover:text-primary transition-colors">
                                                    hr@fairpaysolution.com
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
                                            <h3 className="font-semibold text-foreground mb-1">Office</h3>
                                            <p className="text-muted-foreground">
                                                Agra, Uttar Pradesh 282007<br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                                                <p>Saturday: 10:00 AM - 5:00 PM</p>
                                                <p>Sunday: Closed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="glass-card-strong rounded-2xl p-6">
                                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        asChild
                                    >
                                        <a href="/calculator">
                                            <span className="mr-2">📊</span>
                                            Calculate Your Savings
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        asChild
                                    >
                                        <a href="/eligibility">
                                            <span className="mr-2">✓</span>
                                            Check Eligibility
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        asChild
                                    >
                                        <a href="/how-it-works">
                                            <span className="mr-2">📖</span>
                                            How It Works
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="glass-card-strong rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-primary/10 border border-primary/20 rounded-xl p-8 text-center"
                                    >
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-6 h-6 text-primary-foreground" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground">
                                            Thank you for contacting us. Our team will get back to you within 24 hours.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="mt-6"
                                            onClick={() => setIsSuccess(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="debt-settlement">Debt Settlement</option>
                                                <option value="credit-card">Credit Card Debt</option>
                                                <option value="harassment">Recovery Harassment</option>
                                                <option value="consultation">Request Consultation</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                                                placeholder="Tell us about your situation..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                                                    />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 ml-2" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-muted-foreground text-center">
                                            By submitting this form, you agree to our{" "}
                                            <a href="/privacy" className="text-primary hover:underline">
                                                Privacy Policy
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>

                            {/* Note */}
                            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Note:</strong> For urgent matters, please call us directly at{" "}
                                    <a href="tel:+918449653755" className="text-primary hover:underline font-semibold">
                                        +91 8449653755
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
