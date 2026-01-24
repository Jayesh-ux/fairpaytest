import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const trustBadges = [
  { icon: Shield, label: "RBI Compliant" },
  { icon: Users, label: "10K+ Clients" },
  { icon: TrendingUp, label: "Expert Guidance" },
];

interface HeroSectionProps {
  onOpenCallback: () => void;
}

export function HeroSection({ onOpenCallback }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950 text-white">
      {/* Stars Background */}
      <StarsBackground />
      <ShootingStars />

      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 pt-24 lg:pt-28 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sky-400 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4" />
            <span>Legal Debt Relief, Made Simple</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            Settle Your Loans Legally
            <br />
            <span className="text-sky-400">with FairPaySolution</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto mb-4 text-balance"
          >
            Structured Debt Resolution • Understand Your Legal Rights • Professional Guidance
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base text-slate-400 max-w-xl mx-auto mb-10"
          >
            Expert negotiation with banks and NBFCs to settle your debts legally and rebuild your financial life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="accent" size="xl" onClick={onOpenCallback} className="bg-sky-500 hover:bg-sky-400 text-white border-none glow-primary">
              Get Callback
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="outline" size="xl" asChild className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              <a href="tel:+919389815277">
                Call Now: +91 9389815277
              </a>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-slate-400">
                <badge.icon className="w-5 h-5 text-sky-400" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave - adjusted for dark background */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
