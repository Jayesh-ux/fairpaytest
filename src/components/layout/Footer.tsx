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
    { label: "Blog", href: "/media" },
    { label: "Contact", href: "/contact" },
    { label: "Media Coverage", href: "/media" },
  ],
  legal: [
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Loan Type Policy", href: "/loan-policy" },
    { label: "No Guarantee Policy", href: "/no-guarantee" },
    { label: "Fees & Refund Policy", href: "/fees-refund" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
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
    <footer className="bg-gradient-to-b from-background to-secondary/10 text-foreground border-t border-border">{/* Trust Badges Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{badge.label}</span>
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
                  Fair<span className="text-primary">Pay</span>Solution.com
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Legal Debt Relief, Made Simple. We help Indians settle their debts legally
              and rebuild their financial lives with expert negotiation and support.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+918449653755" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 8449653755
              </a>
              <a href="mailto:support@fairpaysolution.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                support@fairpaysolution.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra 400001
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
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
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 FairPaySolution Pvt Ltd. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-2 text-center md:text-right max-w-2xl">
              <strong>FairPay Solution</strong> - Independent Unsecured Loan Resolution & Advisory Consultancy.<br />
              We are not a bank, NBFC, or lender. Consultancy services only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
