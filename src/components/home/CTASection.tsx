import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenCallback: () => void;
}

export function CTASection({ onOpenCallback }: CTASectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-foreground/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Explore Your Options?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Take the first step towards understanding your debt relief options. Get a free consultation
              and discover what may be possible for your situation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold"
              onClick={onOpenCallback}
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-2 border-white text-white hover:bg-white/20 font-bold"
              asChild
            >
              <a href="tel:+918449653755" className="flex items-center gap-2 transition-colors">
                <Phone className="w-5 h-5" />
                Call: +91 8449653755
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 text-primary-foreground/80"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Completely Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">+91 8449653755</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
