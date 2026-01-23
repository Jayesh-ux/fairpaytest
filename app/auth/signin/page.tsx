'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Shield,
    ArrowRight,
    Lock,
    Sparkles,
    CheckCircle2,
    Users,
    Zap,
    UserPlus,
    LogIn,
    LogOut,
    RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

function SignInContent() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get('callbackUrl') || '/portal';
    const error = searchParams.get('error');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState<'signin' | 'signup' | 'switch' | null>(null);

    const features = [
        { icon: CheckCircle2, text: 'Track your debt resolution journey' },
        { icon: Users, text: 'Direct communication with advisors' },
        { icon: Lock, text: 'Secure document management' },
        { icon: Zap, text: 'Real-time case updates' },
    ];

    // Handle sign in - triggers Google OAuth with account selection
    const handleSignIn = async () => {
        setIsLoading(true);
        setLoadingType('signin');
        try {
            await signIn('google', { callbackUrl });
        } catch (error) {
            console.error('Sign in error:', error);
            setIsLoading(false);
            setLoadingType(null);
        }
    };

    // Handle sign up - same as sign in (Google will show account selection)
    const handleSignUp = async () => {
        setIsLoading(true);
        setLoadingType('signup');
        try {
            await signIn('google', { callbackUrl });
        } catch (error) {
            console.error('Sign up error:', error);
            setIsLoading(false);
            setLoadingType(null);
        }
    };

    // Handle switch account - sign out first then redirect to sign in
    const handleSwitchAccount = async () => {
        setIsLoading(true);
        setLoadingType('switch');
        try {
            // Sign out and redirect back to sign-in page
            await signOut({ redirect: false });
            // After signout, trigger sign in with Google
            await signIn('google', { callbackUrl });
        } catch (error) {
            console.error('Switch account error:', error);
            setIsLoading(false);
            setLoadingType(null);
        }
    };

    // If user is already logged in, show options to continue or switch account
    if (status === 'authenticated' && session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-background">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <img
                                src="/logo.jpg"
                                alt="FairPay Solutions"
                                className="w-12 h-12 rounded-xl object-cover shadow-lg"
                            />
                            <span className="font-display font-bold text-2xl">
                                Fair<span className="text-primary">Pay</span>Solution
                            </span>
                        </Link>
                        <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-full px-4 py-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                            Already Signed In
                        </Badge>
                        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            You're currently signed in as:
                        </p>
                    </div>

                    <Card className="border-border/50 shadow-xl mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 mb-6">
                                <Avatar className="w-14 h-14 border-2 border-primary/20">
                                    <AvatarImage src={session.user.image || ''} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                                        {session.user.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-lg truncate">{session.user.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{session.user.email}</p>
                                    <Badge className={cn(
                                        "mt-1 text-xs",
                                        session.user.role === 'ADMIN'
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                    )}>
                                        {session.user.role === 'ADMIN' ? 'Admin' : 'User'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Continue to Dashboard */}
                            <Button
                                onClick={() => router.push(session.user.role === 'ADMIN' ? '/admin' : '/portal')}
                                size="lg"
                                className="w-full h-14 text-base font-semibold mb-3 rounded-xl gap-2"
                            >
                                <ArrowRight className="w-5 h-5" />
                                Continue to {session.user.role === 'ADMIN' ? 'Admin Dashboard' : 'Portal'}
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground font-medium">
                                        or
                                    </span>
                                </div>
                            </div>

                            {/* Switch Account Button */}
                            <Button
                                onClick={handleSwitchAccount}
                                disabled={isLoading}
                                variant="outline"
                                size="lg"
                                className="w-full h-12 text-base font-medium rounded-xl gap-2"
                            >
                                {isLoading && loadingType === 'switch' ? (
                                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4" />
                                        Sign in with Different Account
                                    </>
                                )}
                            </Button>

                            {/* Sign Out Button */}
                            <Button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                variant="ghost"
                                size="sm"
                                className="w-full mt-3 text-muted-foreground hover:text-red-500 gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out Completely
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to homepage
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Show loading state while checking session
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Not logged in - show sign in / sign up options
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
                <div className="absolute inset-0">
                    {/* Decorative grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    {/* Decorative circles */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-3 mb-12">
                            <img
                                src="/logo.jpg"
                                alt="FairPay Solutions"
                                className="w-14 h-14 rounded-2xl object-cover shadow-2xl"
                            />
                            <span className="font-display font-bold text-3xl text-white">
                                FairPay<span className="opacity-70">Solution</span>
                            </span>
                        </Link>

                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                            Your Journey to
                            <br />
                            <span className="text-white/90">Financial Freedom</span>
                        </h1>

                        <p className="text-lg text-white/80 mb-10 max-w-md leading-relaxed">
                            Access your personalized client portal to track cases, upload documents, and communicate with our expert advisors.
                        </p>

                        <div className="space-y-4">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-3 text-white/90"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <feature.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 xs:p-6 lg:p-12 bg-background min-h-[100dvh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-[min(100%,28rem)] mx-auto"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3 mb-4">
                            <img
                                src="/logo.jpg"
                                alt="FairPay Solutions"
                                className="w-12 h-12 rounded-xl object-cover shadow-lg"
                            />
                            <span className="font-display font-bold text-2xl">
                                Fair<span className="text-primary">Pay</span>Solution
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                            Client Portal
                        </Badge>
                        <h2 className="text-3xl font-bold mb-2">Welcome</h2>
                        <p className="text-muted-foreground">
                            Sign in or create an account to continue
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                        >
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                                {error === 'OAuthAccountNotLinked'
                                    ? 'This email is already linked to another account.'
                                    : 'An error occurred during sign in. Please try again.'}
                            </p>
                        </motion.div>
                    )}

                    {/* Sign In/Up Card */}
                    <Card className="border-border/50 shadow-xl">
                        <CardContent className="p-6 lg:p-8 space-y-4">
                            {/* Sign Up Button - For New Users */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">New to FairPay?</p>
                                <Button
                                    onClick={handleSignUp}
                                    disabled={isLoading}
                                    size="lg"
                                    className="w-full h-12 xs:h-14 text-[12px] min-[340px]:text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all rounded-xl gap-1.5 xs:gap-3 px-2 xs:px-4"
                                >
                                    {isLoading && loadingType === 'signup' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 xs:w-5 xs:h-5 shrink-0" />
                                            <span>Create Account with Google</span>
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground font-medium">
                                        or
                                    </span>
                                </div>
                            </div>

                            {/* Sign In Button - For Existing Users */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Already have an account?</p>
                                <Button
                                    onClick={handleSignIn}
                                    disabled={isLoading}
                                    size="lg"
                                    variant="outline"
                                    className="w-full h-12 xs:h-14 text-[12px] min-[340px]:text-sm sm:text-base font-semibold bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all rounded-xl gap-1.5 xs:gap-3 px-2 xs:px-4"
                                >
                                    {isLoading && loadingType === 'signin' ? (
                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 xs:w-5 xs:h-5 shrink-0" viewBox="0 0 24 24">
                                                <path
                                                    fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            <span>Sign In with Google</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Access Note */}
                    <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Admin Access</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Authorized personnel only. Sign in with your official admin email to access the administration panel.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lock className="w-4 h-4 text-emerald-500" />
                            <span>256-bit SSL</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            <span>Privacy protected</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Back to homepage
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                </div>
            }
        >
            <SignInContent />
        </Suspense>
    );
}
