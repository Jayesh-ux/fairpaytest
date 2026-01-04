import { Link } from "react-router-dom";
import { Shield, Lock, Scale, Award, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Settlement Calculator", href: "/calculator" },
    { label: "Personal Loans", href: "/dashboard/personal-loans" },
    { label: "Business Loans", href: "/dashboard/business-loans" },
    { label: "Medical Debt", href: "/dashboard/medical-debt" },
    { label: "Credit Cards", href: "/dashboard/credit-cards" },
  ],
  company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Compliance", href: "/compliance" },
    { label: "FINRA Disclosure", href: "/finra" },
  ],
};

const trustBadges = [
  { icon: Shield, label: "SOC 2 Certified" },
  { icon: Lock, label: "256-bit AES" },
  { icon: Scale, label: "FINRA Regulated" },
  { icon: Award, label: "$500M+ Settled" },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-primary-foreground">
      {/* Trust Badges Bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm">
                <badge.icon className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/80">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                DebtRelief<span className="text-accent">Pro</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted partner in financial recovery through legal mediation. 
              We help you negotiate and settle debts with confidence and transparency.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <a href="tel:1-800-555-0123" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                1-800-555-0123
              </a>
              <a href="mailto:support@debtreliefpro.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                support@debtreliefpro.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                New York, NY 10001
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2026 DebtRelief Pro. All rights reserved.</p>
            <p>Licensed debt settlement provider. Results may vary.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
