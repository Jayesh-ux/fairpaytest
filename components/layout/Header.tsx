'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSession } from 'next-auth/react';
import { ShieldCheck, LayoutDashboard, LogIn } from 'lucide-react';

const mainNavItems = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  {
    label: 'Services',
    href: '/eligibility',
    submenu: [
      { label: 'Personal Loan Settlement', href: '/eligibility' },
      { label: 'Credit Card Settlement', href: '/eligibility' },
      { label: 'Documentation Support', href: '/eligibility' },
      { label: 'Borrower Rights Guidance', href: '/eligibility' },
    ],
  },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Blog', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
  onOpenCallback: () => void;
}

export function Header({ onOpenCallback }: HeaderProps) {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <>
      {/* Top Bar - Desktop */}
      <div className="hidden lg:block bg-muted/50 text-muted-foreground border-b border-border py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
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
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-md'
            : 'bg-card'
        )}
      >
        <div className="container mx-auto px-2 xs:px-3 sm:px-4">
          <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 group">
              <img
                src="/logo-fairpay.jpg"
                alt="FairPay Solutions"
                className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full object-cover shadow-md group-hover:shadow-glow transition-shadow duration-300 flex-shrink-0 border border-primary/20"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-foreground leading-tight">
                  FAIR<span className="text-primary">PAY</span>
                  <span className="hidden sm:inline"> SOLUTIONS</span>
                  <span className="hidden xs:inline sm:hidden"> SOL</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.submenu ? (
                    <button
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                        pathname === item.href ||
                          pathname?.startsWith(item.href + '/')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Desktop Submenu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-card rounded-xl shadow-xl border border-border p-2 min-w-[250px]">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: Auth & Theme */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />

              {status === 'authenticated' ? (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-xs font-bold text-foreground">{session.user?.name?.split(' ')[0]}</span>
                    <Badge variant="secondary" className="h-4 px-1.5 text-[8px] font-bold uppercase tracking-wider bg-primary/10 text-primary border-none">
                      {session.user?.role}
                    </Badge>
                  </div>
                  <Link href="/portal">
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl h-9">
                      <LayoutDashboard className="w-4 h-4" />
                      Portal
                    </Button>
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="gap-2 rounded-xl border-primary/30 text-primary h-9">
                        <ShieldCheck className="w-4 h-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )}

              <Button variant="accent" size="lg" onClick={onOpenCallback} className="shadow-lg shadow-primary/20">
                Get Callback →
              </Button>
            </div>

            {/* Mobile: Theme Toggle, Phone & Menu Toggle */}
            <div className="flex lg:hidden items-center gap-0.5 xs:gap-1 sm:gap-1.5">
              <ThemeToggle />

              {status === 'authenticated' ? (
                <Link href="/portal">
                  <Button variant="ghost" size="sm" className="px-1.5 xs:px-2 h-7 xs:h-8 text-[10px] xs:text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    Portal
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="px-1.5 xs:px-2 h-7 xs:h-8 text-[10px] xs:text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    Login
                  </Button>
                </Link>
              )}
              <Button
                variant="accent"
                size="sm"
                onClick={onOpenCallback}
                className="text-[0.6rem] xs:text-xs sm:text-sm px-1.5 xs:px-2 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 h-auto whitespace-nowrap min-w-[45px] xs:min-w-[60px]"
              >
                <span className="hidden xs:inline">Callback</span>
                <span className="xs:hidden">Call</span>
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors flex-shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Slide Up Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4">
                {/* Handle */}
                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />

                {/* Mobile Auth Action */}


                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <div key={item.label}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className={cn(
                              'flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-colors',
                              activeSubmenu === item.label
                                ? 'text-primary bg-primary/10'
                                : 'text-foreground hover:bg-muted/50'
                            )}
                          >
                            <span className="flex items-center gap-3">
                              {pathname === item.href && (
                                <span className="w-1 h-6 bg-primary rounded-full" />
                              )}
                              {item.label}
                            </span>
                            <ChevronDown
                              className={cn(
                                'w-5 h-5 transition-transform',
                                activeSubmenu === item.label && 'rotate-180'
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {activeSubmenu === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 py-2 space-y-1">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.label}
                                      href={subItem.href}
                                      className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors',
                            pathname === item.href
                              ? 'text-primary bg-primary/10'
                              : 'text-foreground hover:bg-muted/50'
                          )}
                        >
                          {pathname === item.href && (
                            <span className="w-1 h-6 bg-primary rounded-full" />
                          )}
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <a
                    href="tel:+919389815277"
                    className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +91 9389815277
                  </a>
                  <a
                    href="mailto:support@fairpaysolution.com"
                    className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    support@fairpaysolution.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
