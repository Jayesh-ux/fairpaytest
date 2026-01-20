import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wallet,
  CreditCard,
  ShieldAlert,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Wallet,
    title: "Personal Loan Settlement",
    subtitle: "May reduce by up to 60%",
    description: "Get professional guidance to negotiate your personal loans with major banks and NBFCs.",
    href: "/dashboard/personal",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: CreditCard,
    title: "Credit Card Debt Relief",
    subtitle: "Know your legal rights",
    description: "Understand your rights against harassment and explore options to address outstanding dues.",
    href: "/dashboard/credit-card",
    gradient: "from-accent/10 to-primary/10",
  },
  {
    icon: ShieldAlert,
    title: "Anti-Harassment Service",
    subtitle: "Legal guidance",
    description: "Understand your legal rights and options when dealing with recovery agent communication.",
    href: "/dashboard/harassment",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Credit Score Builder",
    subtitle: "Guidance for recovery",
    description: "Get professional advice on rebuilding your CIBIL score with our credit guidance program.",
    href: "/dashboard/credit-score",
    gradient: "from-accent/10 to-primary/10",
  },
];

export function ServicesSection() {
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
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Debt Relief
            <br />
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Expert assistance for all types of loans. We negotiate on your behalf
            to get you the best possible settlement.
          </p>
        </motion.div>

        {/* Services Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={service.href} className="group block h-full">
                <div className={`relative overflow-hidden rounded-2xl p-6 h-full bg-gradient-to-br ${service.gradient} border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift`}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Subtitle Badge */}
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                    {service.subtitle}
                  </span>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Link */}
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
