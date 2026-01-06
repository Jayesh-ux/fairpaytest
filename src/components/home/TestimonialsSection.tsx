import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    avatar: "PS",
    rating: 5,
    loanType: "Home Loan",
    duration: "7 days",
    quote: "Closed my home loan in just 7 days! The team handled everything from documentation to bank liaison. Got my NOC without any hassle.",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi NCR",
    avatar: "RK",
    rating: 5,
    loanType: "Personal Loan",
    duration: "3 days",
    quote: "Quick and professional service. They helped me understand the foreclosure process and saved me a lot on interest payments.",
  },
  {
    name: "Anita Patel",
    location: "Ahmedabad, Gujarat",
    avatar: "AP",
    rating: 5,
    loanType: "Vehicle Loan",
    duration: "5 days",
    quote: "Got my car loan NOC and lien release in just 5 days. The team was very responsive and kept me updated throughout.",
  },
  {
    name: "Suresh Nair",
    location: "Bangalore, Karnataka",
    avatar: "SN",
    rating: 5,
    loanType: "Business Loan",
    duration: "10 days",
    quote: "Complex business loan closure handled expertly. Their lawyer review service was invaluable for my case.",
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
            Trusted by
            <br />
            <span className="gradient-text">1 Lakh+ Indians</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Real stories from customers who successfully closed their loans with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Quote */}
              <p className="text-foreground text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-4 p-3 rounded-xl bg-muted/50">
                <div>
                  <div className="text-xs text-muted-foreground">Loan Type</div>
                  <div className="font-semibold text-sm text-foreground">{testimonial.loanType}</div>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground">Closed In</div>
                  <div className="font-semibold text-sm text-primary">{testimonial.duration}</div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
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
