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
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="FairPay Solutions"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">
                  Fair<span className="text-primary">Pay</span>Solution.com
                </span>
                <span className="text-xs text-muted-foreground">Legal Consultancy</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Legal Debt Relief, Made Simple. We help Indians settle their debts legally
              and rebuild their financial lives with expert negotiation and support.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+919389815277" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 9389815277
              </a>
              <a href="mailto:support@fairpaysolution.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                support@fairpaysolution.com
              </a>
              <a href="mailto:info@fairpaysolution.com" className="flex items-center gap-2 hover:text-primary transition-colors pl-6 text-[0.8rem]">
                info@fairpaysolution.com
              </a>
              <a href="mailto:hr@fairpaysolution.com" className="flex items-center gap-2 hover:text-primary transition-colors pl-6 text-[0.8rem]">
                hr@fairpaysolution.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Agra, Uttar Pradesh 282007
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

      {/* Disclaimer Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-3 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
              <Shield className="w-4 h-4 text-amber-600" />
            </div>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Disclaimer:
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-5xl">
                <strong className="text-foreground/80">FairPay Solutions</strong> is a private legal consultancy and debt management firm.
                We are <strong className="text-foreground/80">not a bank, NBFC, or government agency</strong>. We do not provide loans or financial aid.
                Our services are strictly limited to legal advisory, debt counselling, and settlement negotiation on behalf of our clients.
                While we strive to achieve the best possible outcome, settlement results depend on individual creditor policies and case specifics.
                We strictly adhere to <strong className="text-foreground/80">RBI guidelines</strong> regarding fair practices.{" "}
                <a
                  href="/FairpaySolutions disclaimer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  View Official Disclaimer PDF
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 FairPay Solutions Pvt Ltd. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-2 text-center md:text-right max-w-2xl">
              <strong>FairPay Solutions</strong> - Independent Unsecured Loan Resolution & Advisory Consultancy.<br />
              We are not a bank, NBFC, or lender. Consultancy services only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
