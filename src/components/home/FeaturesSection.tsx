import { motion } from "framer-motion";
import { 
  Calculator, 
  FileCheck, 
  ShieldCheck, 
  Zap, 
  Users, 
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Calculator,
    title: "AI Settlement Calculator",
    description: "Get an instant estimate of your potential savings with our proprietary algorithm that analyzes creditor behavior patterns.",
    link: "/calculator",
    color: "from-primary to-accent",
  },
  {
    icon: FileCheck,
    title: "Secure Document Vault",
    description: "Upload and manage all your financial documents in one encrypted space with bank-level security.",
    link: "/vault",
    color: "from-secondary to-green-india",
  },
  {
    icon: ShieldCheck,
    title: "Legal Compliance",
    description: "Every negotiation follows RBI guidelines and Indian regulations for your complete protection.",
    link: "/how-it-works",
    color: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Fast Resolution",
    description: "Our AI-assisted process reduces settlement time from months to weeks, saving you time and stress.",
    link: "/eligibility",
    color: "from-secondary to-green-india",
  },
  {
    icon: Users,
    title: "Expert Advocates",
    description: "Certified debt counselors review every case and intervene when human expertise is needed.",
    link: "/about",
    color: "from-primary to-accent",
  },
  {
    icon: Clock,
    title: "24/7 Progress Tracking",
    description: "Monitor your settlement journey in real-time with detailed status updates and milestones.",
    link: "/dashboard",
    color: "from-secondary to-green-india",
  },
];

export function FeaturesSection() {
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
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <br />
            <span className="gradient-text">Financial Freedom</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Our comprehensive platform combines AI technology with legal expertise 
            to deliver results that traditional debt settlement cannot match.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={feature.link}
                className="group block h-full"
              >
                <div className="glass-card rounded-2xl p-8 h-full hover-lift group-hover:border-primary/30 transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button variant="accent" size="xl" asChild>
            <Link to="/eligibility">
              Start Your Journey Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}