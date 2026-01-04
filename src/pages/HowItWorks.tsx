import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardCheck, 
  Users, 
  FileSearch, 
  Scale, 
  MessageSquare, 
  FileCheck2, 
  PartyPopper,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Free Consultation",
    description: "Complete our eligibility assessment to understand your debt situation and explore your options.",
    details: ["10-minute online assessment", "No credit check required", "100% confidential"],
  },
  {
    number: "02",
    icon: Users,
    title: "Expert Assignment",
    description: "We assign a certified debt counselor and legal advocate to your case based on your debt type.",
    details: ["Sector-specialized experts", "Personal case manager", "24/7 support access"],
  },
  {
    number: "03",
    icon: FileSearch,
    title: "Debt Analysis",
    description: "Our AI analyzes your accounts, identifies errors, and calculates optimal settlement targets.",
    details: ["Billing error detection", "Interest recalculation", "Creditor behavior analysis"],
  },
  {
    number: "04",
    icon: Scale,
    title: "Legal Preparation",
    description: "We prepare hardship letters, validation requests, and legal documentation for negotiations.",
    details: ["FDCPA compliance", "Hardship documentation", "Debt validation letters"],
  },
  {
    number: "05",
    icon: MessageSquare,
    title: "Creditor Negotiation",
    description: "Our team negotiates directly with creditors to achieve the lowest possible settlement amount.",
    details: ["Direct creditor contact", "Settlement offers", "Payment plan options"],
  },
  {
    number: "06",
    icon: FileCheck2,
    title: "Agreement Finalization",
    description: "We review all settlement agreements to ensure they're legally binding and protect your rights.",
    details: ["Legal review", "Written settlement terms", "Account closure verification"],
  },
  {
    number: "07",
    icon: PartyPopper,
    title: "Debt Freedom",
    description: "Make your final payment and receive documentation confirming your debt is settled.",
    details: ["Settlement confirmation", "Credit reporting updates", "Graduation support"],
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              Legal Mediation Process
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How <span className="gradient-text">It Works</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our 7-step process combines AI technology with legal expertise to deliver 
              results that traditional debt settlement can't match.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-24 bg-gradient-to-b from-accent to-border hidden lg:block" />
                )}

                <div className="flex gap-6 lg:gap-8 mb-8 lg:mb-12">
                  {/* Step Number & Icon */}
                  <div className="shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-lg">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card rounded-2xl p-6 lg:p-8 flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail) => (
                        <span
                          key={detail}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="accent" size="xl" asChild>
              <Link to="/eligibility">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
