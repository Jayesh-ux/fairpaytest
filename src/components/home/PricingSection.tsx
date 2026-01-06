import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "₹499",
    description: "For simple NOC requests",
    features: [
      "NOC Request Assistance",
      "Document Checklist",
      "Email Support",
      "3-5 Days Processing",
    ],
    popular: false,
    href: "/eligibility",
  },
  {
    name: "Pro",
    price: "₹999",
    description: "Complete guidance & support",
    features: [
      "Everything in Basic",
      "Full Closure Guidance",
      "Letter Drafting",
      "Bank Liaison Support",
      "Priority Processing",
      "Phone Support",
    ],
    popular: true,
    href: "/eligibility",
  },
  {
    name: "Premium",
    price: "₹1,999",
    description: "For complex cases",
    features: [
      "Everything in Pro",
      "Lawyer Review",
      "Direct Bank Liaison",
      "CIBIL Score Guidance",
      "Dispute Resolution",
      "Dedicated Manager",
      "24hr Express Service",
    ],
    popular: false,
    href: "/eligibility",
  },
];

export function PricingSection() {
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
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transparent
            <br />
            <span className="gradient-text">Pricing Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Choose the plan that fits your needs. No hidden charges, 
            100% refund if we can't help.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-secondary text-secondary-foreground border-2 border-primary shadow-xl scale-105"
                  : "glass-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`font-display text-xl font-bold mb-2 ${plan.popular ? "text-secondary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className={`font-display text-4xl font-bold mb-2 ${plan.popular ? "text-primary" : "text-foreground"}`}>
                  {plan.price}
                </div>
                <p className={`text-sm ${plan.popular ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-primary"}`} />
                    <span className={`text-sm ${plan.popular ? "text-secondary-foreground/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <Link to={plan.href}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices inclusive of GST. Secure payment via Razorpay/UPI.
        </motion.p>
      </div>
    </section>
  );
}
