import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    avatar: "RK",
    rating: 5,
    amount: "₹12,00,000",
    saved: "₹6,48,000",
    quote: "Credit card ke karz mein dooba hua tha job loss ke baad. RinMukti ne 54% reduction negotiate kiya aur ab main karz-mukt hoon. Process bahut smooth tha.",
  },
  {
    name: "Priya Sharma",
    location: "Delhi NCR",
    avatar: "PS",
    rating: 5,
    amount: "₹25,00,000",
    saved: "₹12,75,000",
    quote: "Ek chhote business owner ke taur par, mujhe laga bankruptcy hi ek option hai. Inhone mera business loan restructure kiya aur meri company bach gayi. Forever grateful.",
  },
  {
    name: "Anand Patel",
    location: "Ahmedabad, Gujarat",
    avatar: "AP",
    rating: 5,
    amount: "₹8,50,000",
    saved: "₹4,93,000",
    quote: "Medical emergency ke baad hospital bills se crush ho raha tha. Team ne billing errors dhundhe aur baaki negotiate kiya. Humne 58% bacha liya!",
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
            Safalta Ki Kahaniyaan
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Asli Log,
            <br />
            <span className="gradient-text">Asli Results</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Hazaron Bharatiyon se judein jinhone hamari proven settlement 
            strategies se apni financial freedom paai hai.
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
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-6 p-4 rounded-xl bg-muted/50">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Original Karz</div>
                  <div className="font-display font-semibold text-foreground">{testimonial.amount}</div>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Bachaya</div>
                  <div className="font-display font-semibold text-secondary">{testimonial.saved}</div>
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