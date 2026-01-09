import { motion } from "framer-motion";
import { Phone, FileSearch, Scale, Handshake, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Free Consultation",
    description: "Speak with our debt relief expert to understand your options and create a personalized plan.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Custom Plan",
    description: "We analyze your debts and create a tailored strategy to maximize your savings.",
  },
  {
    icon: Scale,
    number: "03",
    title: "Legal Negotiation",
    description: "Our legal team negotiates with your creditors to reduce your outstanding amount.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Settlement",
    description: "Once terms are agreed, we handle all documentation and ensure secure payment processing.",
  },
  {
    icon: PartyPopper,
    number: "05",
    title: "Debt Free",
    description: "Receive your settlement confirmation and start your journey to financial freedom.",
  },
];

interface HowItWorksSectionProps {
  onOpenCallback: () => void;
}

export function HowItWorksSection({ onOpenCallback }: HowItWorksSectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
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
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple 5-Step
            <br />
            <span className="gradient-text">Settlement Process</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Our streamlined process makes debt settlement easy and transparent. 
            Average timeline: 18 months to complete freedom.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 text-center hover-lift h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Step {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Average 18 months to complete
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="accent" size="xl" onClick={onOpenCallback}>
            Start Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
