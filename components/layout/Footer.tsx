'use client';

import Link from 'next/link';
import { CheckCircle, Lock, Shield, Award, Mail, Phone, MapPin, Building2, Download } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Personal Loan Settlement', href: '/eligibility' },
    { label: 'Credit Card Relief', href: '/eligibility' },
    { label: 'Anti-Harassment Service', href: '/eligibility' },
    { label: 'Documentation Support', href: '/eligibility' },
    { label: 'Borrower Rights Guidance', href: '/eligibility' },
  ],
  company: [
    { label: 'About Us', href: '/how-it-works' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Blog', href: '/media' },
    { label: 'Contact', href: '/contact' },
    { label: 'Media Coverage', href: '/media' },
  ],
  legal: [
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Loan Type Policy', href: '/loan-policy' },
    { label: 'No Guarantee Policy', href: '/no-guarantee' },
    { label: 'Fees & Refund Policy', href: '/fees-refund' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

const trustBadges = [
  { icon: Building2, label: 'Udyam Registered' },
  { icon: Shield, label: 'Management Consultancy' },
  { icon: Lock, label: 'Data Protected' },
  { icon: CheckCircle, label: 'Advisory Services' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/10 text-foreground border-t border-border">
      {/* Trust Badges Bar */}
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
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo-fairpay.jpg"
                alt="FairPay Solutions"
                className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-primary/20"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">
                  FAIR<span className="text-primary">PAY</span> SOLUTIONS
                </span>
                <span className="text-xs text-muted-foreground">Legal Consultancy</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-sm">
              Management consultancy and support services including financial awareness,
              debt advisory, documentation assistance, and borrower rights guidance.
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              <strong>Udyam Reg:</strong> UDYAM-UP-01-0175086 | <strong>NIC Code:</strong> 70200
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="tel:+919389815277"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 9389815277
              </a>
              <a
                href="mailto:support@fairpaysolution.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@fairpaysolution.com
              </a>
              <a
                href="mailto:grievance@fairpaysolution.com"
                className="flex items-center gap-2 hover:text-primary transition-colors pl-6 text-[0.8rem]"
              >
                grievance@fairpaysolution.com (Grievance)
              </a>
              <a
                href="mailto:info@fairpaysolution.com"
                className="flex items-center gap-2 hover:text-primary transition-colors pl-6 text-[0.8rem]"
              >
                info@fairpaysolution.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>Anthela Sector 12, Sikandra</p>
                  <p>Agra – 282007, Uttar Pradesh, India</p>
                </div>
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
                    href={link.href}
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
                    href={link.href}
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
                    href={link.href}
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
                Legal Disclaimer:
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-5xl">
                <strong className="text-foreground/80">FAIRPAY SOLUTIONS</strong> is an independent
                advisory and consultancy service provider registered under Udyam (UDYAM-UP-01-0175086).
                We are <strong className="text-foreground/80">NOT a bank, NBFC, financial institution,
                  or RBI-regulated entity</strong>. We do not provide loans, financial aid, or guarantee
                loan waiver, settlement approval, EMI reduction, or credit score improvement. All
                services are advisory and support-based in nature. Outcomes depend entirely on
                respective lender policies. Clients understand that loan settlement may negatively
                impact their credit score.
              </p>
              <a
                href="https://drive.google.com/uc?export=download&id=YOUR_GOOGLE_DRIVE_FILE_ID"
                download="FairPay_Solutions_Official_Disclaimer.pdf"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors font-medium text-sm border border-primary/20"
              >
                <Download className="w-4 h-4" />
                Download Official Disclaimer PDF
              </a>
              <p className="text-xs text-muted-foreground mt-4">
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Grievance Officer:</strong> Compliance & Support Team |
                <a href="mailto:grievance@fairpaysolution.com" className="text-primary hover:underline ml-1">
                  grievance@fairpaysolution.com
                </a>
                <span className="ml-2">| Resolution Time: Within 7 working days</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              <p>© 2025–26 FAIRPAY SOLUTIONS. All rights reserved.</p>
              <p className="text-xs mt-1">
                This website (www.fairpaysolution.com) is owned and operated by FAIRPAY SOLUTIONS,
                a Micro Enterprise registered under Udyam (UDYAM-UP-01-0175086), India.
              </p>
            </div>
            <div className="text-xs text-center md:text-right max-w-md">
              <p className="font-medium text-foreground/80">
                FairPay Solutions is a Micro Enterprise registered under Udyam (UDYAM-UP-01-0175086).
              </p>
              <p className="mt-1">
                We are not a bank, NBFC, or RBI-regulated entity. All services are advisory in nature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
