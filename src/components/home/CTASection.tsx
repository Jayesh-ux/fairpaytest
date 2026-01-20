import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenCallback: () => void;
}

export function CTASection({ onOpenCallback }: CTASectionProps) {
  return (
    <section className="py-12 xs:py-16 sm:py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-foreground/20 to-transparent" />
      </div>

      <div className="container mx-auto px-3 xs:px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 xs:mb-4 sm:mb-5 md:mb-6 px-2">
              Ready to Explore Your Options?
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-5 xs:mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-2">
              Take the first step towards understanding your debt relief options. Get a free consultation
              and discover what may be possible for your situation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 mb-6 xs:mb-8 sm:mb-10"
          >
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 py-3 xs:py-4 sm:py-5 h-auto w-full sm:w-auto"
              onClick={onOpenCallback}
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 ml-1.5 xs:ml-2" />
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 py-3 xs:py-4 sm:py-5 h-auto w-full sm:w-auto"
              asChild
            >
              <a href="tel:+919389815277" className="flex items-center justify-center gap-1.5 xs:gap-2">
                <Phone className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="whitespace-nowrap">+91 9389815277</span>
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6 lg:gap-10 text-primary-foreground/80"
          >
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Shield className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
              <span className="text-xs xs:text-sm font-medium">Confidential</span>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Clock className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
              <span className="text-xs xs:text-sm font-medium">Fast Response</span>
            </div>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Shield className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
              <span className="text-xs xs:text-sm font-medium">RBI Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

