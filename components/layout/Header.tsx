'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail, User, LogOut, ShieldCheck, LayoutDashboard, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      {/* Top Bar - Ultra Compact */}
      <div className="bg-muted/50 text-muted-foreground border-b border-border py-1">
        <div className="container mx-auto px-1 sm:px-4">
          <div className="flex items-center justify-between text-[8px] min-[340px]:text-[9px] sm:text-xs md:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-6">
              <a href="tel:+919389815277" className="flex items-center gap-0.5 hover:text-primary transition-colors whitespace-nowrap">
                <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                <span>9389815277</span>
              </a>
              <a href="mailto:support@fairpaysolution.com" className="flex items-center gap-0.5 hover:text-primary transition-colors truncate max-w-[90px] min-[340px]:max-w-none">
                <Mail className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                <span className="truncate">support@fairpaysolution.com</span>
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
            ? 'glass-nav shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-1 sm:px-4">
          <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-1 sm:gap-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink min-w-0">
              <img
                src="/logo-fairpay.jpg"
                alt="FairPay Solutions"
                className="w-5 h-5 min-[340px]:w-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full object-cover border border-primary/20 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-black text-[9px] min-[340px]:text-[11px] sm:text-base lg:text-xl text-foreground leading-none tracking-tighter whitespace-nowrap">
                  FAIR<span className="text-primary">PAY</span> SOLUTIONS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.submenu ? (
                    <button
                      className={cn(
                        'px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                        pathname === item.href ||
                          pathname?.startsWith(item.href + '/')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.submenu && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-card rounded-xl shadow-2xl border border-border p-2 min-w-[250px] transform-gpu">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:translate-x-1 transition-all duration-200"
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

            {/* Right Section: Theme, Auth, CTA & Mobile Menu */}
            <div className="flex items-center gap-1 lg:gap-4 ml-auto">
              <div className="flex scale-[0.7] min-[340px]:scale-85 sm:scale-100 origin-right transition-transform">
                <ThemeToggle />
              </div>

              {status === 'authenticated' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pl-2 rounded-full border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] sm:text-xs font-bold text-foreground truncate max-w-[60px] sm:max-w-[80px]">
                          {session.user?.name?.split(' ')[0]}
                        </span>
                        <Badge variant="secondary" className="h-3.5 px-1 text-[8px] font-bold uppercase bg-primary/10 text-primary border-none">
                          {session.user?.role}
                        </Badge>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {session.user?.name?.[0] || <User className="w-4 h-4" />}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2 border-border/50 shadow-xl rounded-xl p-2">
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold leading-none">{session.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    <Link href="/portal">
                      <DropdownMenuItem className="p-3 cursor-pointer rounded-lg gap-3">
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        <span>Client Portal</span>
                      </DropdownMenuItem>
                    </Link>
                    {session.user?.role === 'ADMIN' && (
                      <Link href="/admin">
                        <DropdownMenuItem className="p-3 cursor-pointer rounded-lg gap-3 text-primary focus:text-primary">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem
                      className="p-3 cursor-pointer rounded-lg gap-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                      onClick={() => signOut()}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/signin" className="flex-shrink-0">
                  <Button variant="outline" className="hidden lg:flex gap-2 rounded-xl h-10 xl:h-11 font-semibold">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                  <Button variant="ghost" className="lg:hidden h-7 min-[340px]:h-9 px-1 min-[340px]:px-2 text-[8px] min-[340px]:text-[10px] sm:text-xs font-bold rounded-lg border border-border/50 flex items-center gap-0.5">
                    <LogIn className="w-2.5 h-2.5" />
                    Login
                  </Button>
                </Link>
              )}

              <Button
                variant="accent"
                onClick={onOpenCallback}
                className="hidden md:flex shadow-lg shadow-primary/20 rounded-xl px-4 lg:px-6 h-10 lg:h-11 font-semibold flex-shrink-0"
              >
                Get Callback <span className="ml-2 inline">→</span>
              </Button>
              <Button
                variant="accent"
                onClick={onOpenCallback}
                className="md:hidden h-7 min-[340px]:h-9 px-1.5 min-[340px]:px-3 text-[8px] min-[340px]:text-[10px] sm:text-xs font-bold rounded-lg shadow-md flex-shrink-0"
              >
                Callback
              </Button>

              {/* Mobile Menu Trigger */}
              <div className="lg:hidden flex-shrink-0">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button className="p-0.5 min-[340px]:p-1 rounded-lg hover:bg-muted/50 transition-colors">
                      {mobileMenuOpen ? <X className="w-4 h-4 text-primary" /> : <Menu className="w-4 h-4 min-[340px]:w-5 min-[340px]:h-5" />}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] p-0 flex flex-col bg-card border-l border-border">
                    <SheetHeader className="p-6 border-b border-border text-left">
                      <SheetTitle>
                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                          <img
                            src="/logo-fairpay.jpg"
                            alt="FairPay Solutions"
                            className="w-10 h-10 rounded-full object-cover border border-primary/20"
                          />
                          <div className="flex flex-col">
                            <span className="font-display font-bold text-lg leading-tight">
                              FAIR<span className="text-primary">PAY</span> <span className="inline">SOLUTIONS</span>
                            </span>
                          </div>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-6 px-4">
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
                                  {item.label}
                                  <ChevronDown
                                    className={cn(
                                      'w-5 h-5 transition-transform duration-200',
                                      activeSubmenu === item.label && 'rotate-180'
                                    )}
                                  />
                                </button>
                                <div className={cn(
                                  "grid transition-all duration-200 ease-in-out",
                                  activeSubmenu === item.label ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                                )}>
                                  <div className="overflow-hidden pl-4 border-l-2 border-primary/10 ml-4 space-y-1">
                                    {item.submenu.map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        href={subItem.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors',
                                  pathname === item.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-foreground hover:bg-muted/50'
                                )}
                              >
                                {item.label}
                                <ChevronRight className="w-4 h-4 opacity-50" />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 border-t border-border mt-auto bg-muted/30">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                        <ThemeToggle />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 text-primary" />
                          <a href="tel:+919389815277" className="hover:text-primary transition-colors font-medium">
                            +91 9389815277
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 text-primary" />
                          <a href="mailto:support@fairpaysolution.com" className="hover:text-primary transition-colors font-medium break-all">
                            support@fairpaysolution.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav >
        </div >
      </motion.header >

    </>
  );
}
