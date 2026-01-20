import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Redirect to login if not authenticated
    if (!session?.user) {
        redirect('/auth/signin?callbackUrl=/portal');
    }

    // If user is admin, redirect to admin dashboard
    if (session.user.role === 'ADMIN') {
        redirect('/admin');
    }

    // Import and render the client layout
    const PortalLayoutClient = (await import('./PortalLayoutClient')).default;

    return <PortalLayoutClient>{children}</PortalLayoutClient>;
}
