import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenCallback: () => void;
}

export function CTASection({ onOpenCallback }: CTASectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto glass-card-strong rounded-[2.5rem] p-8 md:p-16 border-primary/20 shadow-glow relative overflow-hidden text-center"
        >
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Explore Your <span className="text-primary">Options?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Take the first step towards understanding your debt relief options. Get a free consultation
                and discover what may be possible for your situation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                size="xl"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8"
                onClick={onOpenCallback}
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="font-bold px-8 border-primary/30 hover:bg-primary/5"
                asChild
              >
                <a href="tel:+919389815277" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: +91 9389815277
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 text-muted-foreground"
            >
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold">Completely Confidential</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold">Fast Response</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold">RBI Compliant</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
