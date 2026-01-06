import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Handshake, Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Lock,
    title: "Loan Closure",
    description: "Full repayment confirmation with NOC. Regular or pre-closure assistance for all loan types.",
    features: ["NOC Certificate", "No Dues Letter", "Lien Release"],
    href: "/dashboard",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: Handshake,
    title: "Loan Settlement",
    description: "Negotiate outstanding dues for defaulters. Improve your CIBIL score with expert guidance.",
    features: ["Debt Negotiation", "CIBIL Improvement", "Legal Support"],
    href: "/dashboard",
    gradient: "from-accent/10 to-primary/10",
  },
  {
    icon: Calculator,
    title: "Foreclosure Calculator",
    description: "Calculate your potential savings on early loan payoff. Make informed financial decisions.",
    features: ["Interest Savings", "EMI Comparison", "Break-even Analysis"],
    href: "/calculator",
    gradient: "from-primary/10 to-accent/10",
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
            Complete Loan Closure
            <br />
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            From NOC certificates to debt settlement, we handle everything 
            to make your loan closure journey smooth and hassle-free.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={service.href} className="group block h-full">
                <div className={`relative overflow-hidden rounded-2xl p-8 h-full bg-gradient-to-br ${service.gradient} border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift`}>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

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
