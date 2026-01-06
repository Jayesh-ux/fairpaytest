import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "100K+", label: "Loans Closed" },
  { icon: Shield, value: "50+", label: "Bank Partners" },
  { icon: Zap, value: "24hrs", label: "Fast Processing" },
  { icon: CheckCircle, value: "99%", label: "Success Rate" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern" />
      
      {/* Gradient Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container mx-auto px-4 pt-28 lg:pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Shield className="w-4 h-4" />
            <span>Trusted by 1 Lakh+ Indians • RBI Compliant Process</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Close Your Loan in Minutes
            <br />
            <span className="gradient-text">Get Your NOC Instantly</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            Expert guidance for loan closure, foreclosure, and no-dues certificates. 
            Hassle-free process with major banks across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="accent" size="xl" asChild>
              <Link to="/eligibility">
                Start Closure Process
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/calculator">
                Calculate Savings
              </Link>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
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
