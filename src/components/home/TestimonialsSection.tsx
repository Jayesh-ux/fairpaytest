import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    avatar: "SM",
    rating: 5,
    amount: "$45,000",
    saved: "$24,300",
    quote: "I was drowning in credit card debt after my divorce. DebtRelief Pro negotiated a 54% reduction and I'm finally debt-free. The process was surprisingly smooth.",
  },
  {
    name: "Michael R.",
    location: "Chicago, IL",
    avatar: "MR",
    rating: 5,
    amount: "$78,000",
    saved: "$39,780",
    quote: "As a small business owner, I thought bankruptcy was my only option. They restructured my business debt and saved my company. Forever grateful.",
  },
  {
    name: "Jennifer L.",
    location: "Miami, FL",
    avatar: "JL",
    rating: 5,
    amount: "$32,000",
    saved: "$18,560",
    quote: "Medical bills from an unexpected surgery were crushing us. The team found billing errors and negotiated the rest. We saved 58% overall!",
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
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real People,
            <br />
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Join thousands of Americans who've reclaimed their financial freedom 
            with our proven settlement strategies.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 hover-lift"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/20 mb-4" />

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-6 p-4 rounded-xl bg-muted/50">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Original Debt</div>
                  <div className="font-display font-semibold text-foreground">{testimonial.amount}</div>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Saved</div>
                  <div className="font-display font-semibold text-accent">{testimonial.saved}</div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
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
