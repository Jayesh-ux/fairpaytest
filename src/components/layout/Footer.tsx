import { Link } from "react-router-dom";
import { CheckCircle, Lock, Shield, Award, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Personal Loan Settlement", href: "/dashboard/personal" },
    { label: "Credit Card Relief", href: "/dashboard/credit-card" },
    { label: "Anti-Harassment Service", href: "/dashboard/harassment" },
    { label: "Credit Score Builder", href: "/dashboard/credit-score" },
    { label: "Home Loan Resolution", href: "/dashboard/home" },
  ],
  company: [
    { label: "About Us", href: "/how-it-works" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog", href: "/vault" },
    { label: "Contact", href: "/vault" },
    { label: "Careers", href: "/vault" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const trustBadges = [
  { icon: Shield, label: "CISA Certified" },
  { icon: Award, label: "Experian Partner" },
  { icon: Lock, label: "Escrow Safe" },
  { icon: CheckCircle, label: "RBI Compliant" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Trust Badges Bar */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-secondary-foreground/80">{badge.label}</span>
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
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">
                  Debt<span className="text-primary">Relief</span>Hub.in
                </span>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Legal Debt Relief, Made Simple. We help Indians settle their debts legally 
              and rebuild their financial lives with expert negotiation and support.
            </p>
            <div className="space-y-3 text-sm text-secondary-foreground/70">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <a href="mailto:help@debtreliefhub.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                help@debtreliefhub.in
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra 400001
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-secondary-foreground/90">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
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
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© 2026 DebtReliefHub Solutions Pvt Ltd. All rights reserved.</p>
            <p className="text-xs max-w-lg text-center md:text-right">
              Disclaimer: DebtReliefHub is an advisory service only. We are not a bank or financial institution. 
              Consult professionals for financial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
