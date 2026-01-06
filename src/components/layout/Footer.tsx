import { Link } from "react-router-dom";
import { CheckCircle, Lock, Shield, Award, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Loan Closure", href: "/dashboard" },
    { label: "Loan Settlement", href: "/dashboard" },
    { label: "Foreclosure Calculator", href: "/calculator" },
    { label: "NOC Certificate", href: "/vault" },
    { label: "No Dues Letter", href: "/vault" },
  ],
  company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/eligibility" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/vault" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const trustBadges = [
  { icon: CheckCircle, label: "100K+ Loans Closed" },
  { icon: Shield, label: "Partnered with Major Banks" },
  { icon: Lock, label: "256-bit SSL Encrypted" },
  { icon: Award, label: "RBI Compliant" },
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
                  Loan<span className="text-primary">Closure</span>.in
                </span>
              </div>
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              India's trusted platform for hassle-free loan closure. Get your NOC, 
              No Dues Certificate, and closure letters with expert guidance.
            </p>
            <div className="space-y-3 text-sm text-secondary-foreground/70">
              <a href="tel:1800-123-4567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                1800-123-4567 (Toll Free)
              </a>
              <a href="mailto:support@loanclosure.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                support@loanclosure.in
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
            <p>© 2026 LoanClosure.in. All rights reserved.</p>
            <p className="text-xs max-w-lg text-center md:text-right">
              Disclaimer: LoanClosure.in is an advisory service only. We are not a bank or financial institution. 
              Please consult professionals for financial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
