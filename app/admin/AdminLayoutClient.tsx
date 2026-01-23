'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Ticket,
    Users,
    MessageSquare,
    Star,
    PhoneCall,
    Menu,
    X,
    ChevronRight,
    LogOut,
    Bell,
    Settings,
    ShieldCheck,
    Search,
    Command,
    ChevronDown,
    AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const adminSidebarItems = [
    {
        label: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
        description: 'Dashboard & Analytics',
    },
    {
        label: 'Tickets',
        href: '/admin/tickets',
        icon: Ticket,
        description: 'Case Management',
    },
    {
        label: 'Callbacks',
        href: '/admin/callbacks',
        icon: PhoneCall,
        description: 'Lead Pipeline',
        badge: 'New',
    },
    {
        label: 'Reviews',
        href: '/admin/reviews',
        icon: Star,
        description: 'Testimonial Moderation',
    },
    {
        label: 'Users',
        href: '/admin/users',
        icon: Users,
        description: 'User Management',
    },
    {
        label: 'Communications',
        href: '/admin/messages',
        icon: MessageSquare,
        description: 'Message Center',
    },
    {
        label: 'Emergency',
        href: '/admin/emergency',
        icon: AlertTriangle,
        description: 'Priority Requests',
        badge: 'Alert',
    },
];

export default function AdminLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border px-1.5 xs:px-3 sm:px-4 py-2 xs:py-3">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl hover:bg-muted transition-colors"
                    >
                        <Menu className="w-4 h-4 xs:w-5 xs:h-5" />
                    </button>

                    <Link href="/admin" className="flex items-center gap-1.5 xs:gap-2 min-w-0">
                        <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                            <ShieldCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" />
                        </div>
                        <span className="font-bold text-xs xs:text-base sm:text-lg truncate">FairPay Admin</span>
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
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[260px] xs:w-[280px] sm:w-80 bg-card border-r border-border z-50 lg:hidden overflow-y-auto"
                        >
                            <AdminSidebarContent
                                session={session}
                                pathname={pathname}
                                onClose={() => setSidebarOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:block fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 transition-all duration-300",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                <AdminSidebarContent
                    session={session}
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />
            </aside>

            {/* Main Content */}
            <main className={cn(
                "min-h-screen transition-all duration-300 flex flex-col",
                isCollapsed ? "lg:ml-20" : "lg:ml-72"
            )}>
                {/* Top Header */}
                <header className="hidden lg:flex sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-8 3xl:px-12 4xl:px-16 py-4 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="text-xl 3xl:text-2xl font-bold flex items-center gap-2">
                                {adminSidebarItems.find((item) => item.href === pathname)?.label || 'Administration'}
                            </h1>
                            <p className="text-xs 3xl:text-sm text-muted-foreground mt-0.5">
                                {adminSidebarItems.find((item) => item.href === pathname)?.description || 'Control Center'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted border border-border text-muted-foreground text-sm hover:bg-muted/80 transition-colors">
                            <Search className="w-4 h-4" />
                            <span className="hidden xl:inline">Search...</span>
                            <kbd className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background text-[10px] font-medium">
                                <Command className="w-3 h-3" /> K
                            </kbd>
                        </button>

                        {/* Theme Toggle */}
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
                                    <Avatar className="w-8 h-8 border-2 border-primary/30">
                                        <AvatarImage src={session?.user?.image || ''} />
                                        <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                                            {session?.user?.name?.charAt(0) || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-left hidden xl:block">
                                        <p className="text-sm font-semibold">{session?.user?.name}</p>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Admin</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden xl:block" />
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
                                    <Link href="/admin/settings" className="cursor-pointer">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-red-500 focus:text-red-500 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 xs:p-5 sm:p-6 lg:p-8 3xl:p-10 4xl:p-12 min-w-0">
                    <div className="max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

function AdminSidebarContent({
    session,
    pathname,
    onClose,
    isCollapsed = false,
    onToggleCollapse,
}: {
    session: any;
    pathname: string;
    onClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}) {
    return (
        <div className="flex flex-col h-full">
            {/* Brand Header */}
            <div className={cn("p-4 border-b border-border", isCollapsed ? "px-3" : "px-6")}>
                <div className="flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        {!isCollapsed && (
                            <div>
                                <span className="font-display font-bold text-xl tracking-tight">
                                    Fair<span className="text-primary">Pay</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                                        Admin Panel
                                    </p>
                                </div>
                            </div>
                        )}
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

            {/* Navigation */}
            <nav className={cn("flex-1 py-4 overflow-y-auto", isCollapsed ? "px-2" : "px-3")}>
                <div className="space-y-1">
                    {adminSidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative',
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                    isActive
                                        ? "bg-white/20"
                                        : "bg-muted group-hover:bg-muted/80"
                                )}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                {!isCollapsed && (
                                    <>
                                        <div className="flex-1 min-w-0">
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </div>
                                        {item.badge && (
                                            <Badge className="bg-amber-500/20 text-amber-400 border-none text-[10px] font-bold px-1.5">
                                                {item.badge}
                                            </Badge>
                                        )}
                                        {isActive && (
                                            <ChevronRight className="w-4 h-4 opacity-60" />
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className={cn("border-t border-border", isCollapsed ? "p-2" : "p-4")}>
                {/* System Status */}
                {!isCollapsed && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 mb-3">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            </div>
                            <p className="text-xs font-bold text-emerald-500">System Online</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground">All services operational</p>
                    </div>
                )}

                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className={cn(
                        "flex items-center gap-3 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all w-full group",
                        isCollapsed ? "p-2 justify-center" : "px-3 py-2.5"
                    )}
                    title={isCollapsed ? "Logout" : undefined}
                >
                    <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                    {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
                </button>
            </div>
        </div>
    );
}
