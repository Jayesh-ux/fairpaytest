import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';

// Extend the session types
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: Role;
            phone?: string | null;
            createdAt?: Date;
        };
    }

    interface User {
        role?: Role;
        phone?: string | null;
        createdAt?: Date;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: Role;
        phone?: string | null;
        createdAt?: Date;
    }
}

// Admin emails - these users will automatically get ADMIN role
// IMPORTANT: Add your Gmail address here to access the Admin Dashboard
const ADMIN_EMAILS = [
    ...(process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [])
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'select_account', // Always show account selection
                },
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks: {
        // This callback is crucial for middleware to work with next-auth v5
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user?.role === 'ADMIN';

            const isProtectedRoute = nextUrl.pathname.startsWith('/portal') || nextUrl.pathname.startsWith('/admin');
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');
            const isAuthRoute = nextUrl.pathname.startsWith('/auth/');

            // Allow logged-in users to access auth pages (for switching accounts)
            // The sign-in page now handles this case and shows appropriate options

            // Protect admin routes
            if (isAdminRoute) {
                if (!isLoggedIn) {
                    const signInUrl = new URL('/auth/signin', nextUrl.origin);
                    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
                    return Response.redirect(signInUrl);
                }
                if (!isAdmin) {
                    return Response.redirect(new URL('/portal', nextUrl.origin));
                }
                return true;
            }

            // Protect portal routes
            if (isProtectedRoute && !isLoggedIn) {
                const signInUrl = new URL('/auth/signin', nextUrl.origin);
                signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
                return Response.redirect(signInUrl);
            }

            return true;
        },
        async jwt({ token, user, trigger, session }) {
            // On initial sign in, add user info to token
            if (user) {
                token.id = user.id;
                token.role = user.role || 'USER';
                token.phone = user.phone;
                token.createdAt = user.createdAt;

                // Check if user email is in admin list and update role
                if (user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
                    token.role = 'ADMIN';
                    // Update user role in database
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { role: 'ADMIN' },
                    });
                }
            }

            // Handle session update (e.g., when role changes or profile update)
            if (trigger === 'update') {
                if (session?.role) token.role = session.role;
                if (session?.phone) token.phone = session.phone;
            }

            return token;
        },
        async session({ session, token }) {
            // Add user id and role to session
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as Role;
                session.user.phone = token.phone as string | null;
                session.user.createdAt = token.createdAt as Date;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            // Allow all OAuth sign-ins
            if (account?.provider === 'google') {
                return true;
            }
            // Allow credential sign-ins
            return true;
        },
    },
    events: {
        async createUser({ user }) {
            // Log new user creation
            console.log(`New user created: ${user.email}`);

            // If user email is in admin list, update role
            if (user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { role: 'ADMIN' },
                });
                console.log(`User ${user.email} promoted to ADMIN`);
            }
        },
    },
    debug: process.env.NODE_ENV === 'development',
});

// Helper function to get current user on server
export async function getCurrentUser() {
    const session = await auth();
    return session?.user;
}

// Helper function to check if user is admin
export async function isAdmin() {
    const user = await getCurrentUser();
    return user?.role === 'ADMIN';
}
