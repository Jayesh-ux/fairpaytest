'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";

interface Testimonial {
  name: string;
  location: string | null;
  text: string;
  rating: number;
  amount?: string;
  settled?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Rahul Mehta",
    location: "Mumbai, Maharashtra",
    rating: 5,
    amount: "₹10L",
    settled: "₹4L",
    text: "Settled ₹10L debt for just ₹4L! The team handled everything professionally. Life-changing experience for my family.",
  },
  {
    name: "Priya Krishnan",
    location: "Delhi NCR",
    rating: 5,
    amount: "₹5L",
    settled: "₹2.2L",
    text: "Recovery calls stopped within 1 week of enrolling. Professional team that truly cares about clients.",
  },
  {
    name: "Arjun Sharma",
    location: "Bangalore, Karnataka",
    rating: 5,
    amount: "Credit Score",
    settled: "520 → 720",
    text: "My credit score went from 520 to 720 in just 12 months after settlement. Thank you FairPaySolution!",
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            // Mix dynamic reviews with high-quality defaults or replacement
            setTestimonials(data.reviews.map((r: any) => ({
              name: r.name,
              location: r.location,
              text: r.text,
              rating: r.rating
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Stories from
            <br />
            <span className="gradient-text">Real Customers</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Thousands of Indians have achieved financial freedom with our help.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 hover-lift flex flex-col h-full"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 flex-1">
                "{testimonial.text}"
              </p>

              {testimonial.amount && (
                <div className="flex gap-4 mb-6 p-4 rounded-xl bg-muted/50">
                  <div className="flex-1">
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Original</div>
                    <div className="font-bold text-foreground text-sm">{testimonial.amount}</div>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="flex-1">
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Settled</div>
                    <div className="font-bold text-primary text-sm">{testimonial.settled}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location || 'India'}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
