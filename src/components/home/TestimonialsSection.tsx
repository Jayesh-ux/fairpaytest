import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Mumbai, Maharashtra",
    avatar: "RM",
    rating: 5,
    amount: "₹10L",
    settled: "₹4L",
    quote: "Settled ₹10L debt for just ₹4L! The team handled everything professionally. Life-changing experience for my family.",
  },
  {
    name: "Priya Krishnan",
    location: "Delhi NCR",
    avatar: "PK",
    rating: 5,
    amount: "₹5L",
    settled: "₹2.2L",
    quote: "Recovery calls stopped within 1 week of enrolling. Professional team that truly cares about clients.",
  },
  {
    name: "Arjun Sharma",
    location: "Bangalore, Karnataka",
    avatar: "AS",
    rating: 5,
    amount: "Credit Score",
    settled: "520 → 720",
    quote: "My credit score went from 520 to 720 in just 12 months after settlement. Thank you FairPaySolution!",
  },
];

export function TestimonialsSection() {
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

        {/* Testimonials Grid - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 hover-lift"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Quote */}
              <p className="text-foreground text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-6 p-4 rounded-xl bg-muted/50">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Original</div>
                  <div className="font-bold text-foreground">{testimonial.amount}</div>
                </div>
                <div className="w-px bg-border" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Settled</div>
                  <div className="font-bold text-primary">{testimonial.settled}</div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
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
