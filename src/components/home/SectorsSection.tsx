import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CreditCard, 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Wallet,
  ArrowUpRight 
} from "lucide-react";

const sectors = [
  {
    icon: Wallet,
    title: "Personal Loans",
    description: "High-interest personal loan settlements through hardship documentation and skilled negotiation.",
    stats: "Avg. 52% reduction",
    href: "/dashboard/personal-loans",
    gradient: "from-primary/20 to-accent/20",
    iconBg: "bg-primary",
  },
  {
    icon: Building2,
    title: "Business Loans",
    description: "Cash flow-based restructuring and settlement options for small and medium enterprises.",
    stats: "Avg. 48% reduction",
    href: "/dashboard/business-loans",
    gradient: "from-secondary/20 to-green-india/20",
    iconBg: "bg-secondary",
  },
  {
    icon: Stethoscope,
    title: "Medical Debt",
    description: "Hospital billing error identification and insurance advocacy to reduce medical bills.",
    stats: "Avg. 55% reduction",
    href: "/dashboard/medical-debt",
    gradient: "from-primary/20 to-accent/20",
    iconBg: "bg-primary",
  },
  {
    icon: CreditCard,
    title: "Credit Cards",
    description: "Interest freeze negotiations and lump-sum settlement offers with major banks.",
    stats: "Avg. 50% reduction",
    href: "/dashboard/credit-cards",
    gradient: "from-secondary/20 to-green-india/20",
    iconBg: "bg-secondary",
  },
  {
    icon: GraduationCap,
    title: "Education Loans",
    description: "Income-based repayment plans and education loan restructuring guidance.",
    stats: "Various options",
    href: "/dashboard/student-loans",
    gradient: "from-primary/20 to-accent/20",
    iconBg: "bg-primary",
  },
];

export function SectorsSection() {
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
            Specialized Solutions
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Debt Settlement by
            <br />
            <span className="gradient-text">Industry Sector</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Every debt type requires a unique approach. Our sector-specific strategies 
            maximize your savings with tailored negotiation tactics.
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Link to={sector.href} className="group block h-full">
                <div className={`relative overflow-hidden rounded-2xl p-8 h-full bg-gradient-to-br ${sector.gradient} border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <sector.icon className="w-full h-full" />
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${sector.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <sector.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    {sector.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {sector.description}
                  </p>

                  {/* Stats Badge */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-sm font-medium text-foreground border border-border/50">
                    {sector.stats}
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