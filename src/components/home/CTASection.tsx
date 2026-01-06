import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Free consultation with no obligation",
  "Get your NOC in as little as 24 hours",
  "100% refund if we can't help",
];

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/3 w-48 h-48 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
          >
            Ready to Close Your Loan?
            <br />
            <span className="text-primary">Start Today</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8"
          >
            Join thousands of Indians who have successfully closed their loans 
            with our expert guidance. Your NOC is just a few steps away.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10"
          >
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/eligibility">
                Start Closure Process
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:1800-123-4567">
                <Phone className="w-5 h-5 mr-2" />
                1800-123-4567 (Toll Free)
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
