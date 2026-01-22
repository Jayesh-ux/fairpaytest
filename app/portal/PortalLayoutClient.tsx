'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Ticket,
    FileText,
    MessageSquare,
    User,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Bell,
    Settings,
    HelpCircle,
    ChevronDown,
    Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const sidebarItems = [
    {
        label: 'Dashboard',
        href: '/portal',
        icon: LayoutDashboard,
        description: 'Overview & Progress',
    },
    {
        label: 'My Cases',
        href: '/portal/tickets',
        icon: Ticket,
        description: 'Track your cases',
    },
    {
        label: 'Documents',
        href: '/portal/documents',
        icon: FileText,
        description: 'Upload & manage files',
    },
    {
        label: 'Messages',
        href: '/portal/messages',
        icon: MessageSquare,
        description: 'Chat with advisors',
    },
    {
        label: 'Profile',
        href: '/portal/profile',
        icon: User,
        description: 'Account settings',
    },
];

export default function PortalLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border px-2 xs:px-3 sm:px-4 py-2 xs:py-3">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl hover:bg-muted transition-colors"
                    >
                        <Menu className="w-4 h-4 xs:w-5 xs:h-5" />
                    </button>

                    <Link href="/portal" className="flex items-center gap-1.5 xs:gap-2">
                        <img
                            src="/logo.jpg"
                            alt="FairPay"
                            className="w-7 h-7 xs:w-8 xs:h-8 rounded-lg shadow-md"
                        />
                        <span className="font-bold text-sm xs:text-base sm:text-lg">
                            Fair<span className="text-primary">Pay</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-0.5 xs:gap-1">
                        <ThemeToggle />
                        <button className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl hover:bg-muted transition-colors relative">
                            <Bell className="w-4 h-4 xs:w-5 xs:h-5" />
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 xs:w-2 xs:h-2 bg-primary rounded-full" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[260px] xs:w-[280px] sm:w-80 bg-card border-r border-border z-50 lg:hidden overflow-y-auto"
                        >
                            <SidebarContent
                                session={session}
                                pathname={pathname}
                                onClose={() => setSidebarOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-40">
                <SidebarContent session={session} pathname={pathname} />
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen">
                {/* Desktop Header */}
                <header className="hidden lg:flex sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-8 3xl:px-12 4xl:px-16 py-4 items-center justify-between">
                    <div>
                        <h1 className="text-xl 3xl:text-2xl font-bold">
                            {sidebarItems.find((item) => item.href === pathname)?.label || 'Portal'}
                        </h1>
                        <p className="text-sm 3xl:text-base text-muted-foreground">
                            {sidebarItems.find((item) => item.href === pathname)?.description || `Welcome, ${session?.user?.name?.split(' ')[0] || 'User'}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                                    <Bell className="w-5 h-5 text-muted-foreground" />
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No new notifications
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="h-6 w-px bg-border" />

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-muted transition-colors">
                                    <Avatar className="w-9 h-9 border-2 border-primary/20">
                                        <AvatarImage src={session?.user?.image || ''} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {session?.user?.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold">{session?.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">Client Portal</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{session?.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/portal/profile" className="cursor-pointer">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/portal/settings" className="cursor-pointer">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/" className="cursor-pointer">
                                        <Home className="w-4 h-4 mr-2" />
                                        Back to Website
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-red-500 focus:text-red-500 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-2 xs:p-3 sm:p-4 lg:p-8 3xl:p-10 4xl:p-12">
                    <div className="w-full max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarContent({
    session,
    pathname,
    onClose,
}: {
    session: any;
    pathname: string;
    onClose?: () => void;
}) {
    return (
        <div className="flex flex-col h-full">
            {/* Brand Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                        <img
                            src="/logo.jpg"
                            alt="FairPay"
                            className="w-10 h-10 rounded-xl shadow-md"
                        />
                        <div>
                            <span className="font-bold text-lg">
                                Fair<span className="text-primary">Pay</span>
                            </span>
                            <p className="text-xs text-muted-foreground">Client Portal</p>
                        </div>
                    </Link>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* User Profile Card */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={session?.user?.image || ''} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                            {session?.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                            {session?.user?.name || 'Guest'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {session?.user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <div className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                isActive
                                    ? "bg-white/20"
                                    : "bg-muted group-hover:bg-background"
                            )}>
                                <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="font-medium text-sm">{item.label}</span>
                                <p className={cn(
                                    "text-xs truncate",
                                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                                )}>
                                    {item.description}
                                </p>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-2">
                {/* Help Card */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <HelpCircle className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm font-semibold">Need Help?</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                        Our advisors are here to assist you.
                    </p>
                    <Button size="sm" className="w-full rounded-lg" asChild>
                        <a href="tel:+919389815277">Call Support</a>
                    </Button>
                </div>

                {/* Settings & Logout */}
                <Link
                    href="/portal/settings"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Settings</span>
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
