import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Redirect to login if not authenticated
    if (!session?.user) {
        redirect('/auth/signin?callbackUrl=/admin');
    }

    // Redirect to portal if user is not admin
    if (session.user.role !== 'ADMIN') {
        redirect('/portal');
    }

    // Import and render the client layout
    const AdminLayoutClient = (await import('./AdminLayoutClient')).default;

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
