import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-sm uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-secondary)' }}>
                    Membership
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-14">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                    <div className="rounded-[24px] p-8" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <p className="font-display text-2xl font-medium" style={{ color: 'var(--color-text)' }}>You are logged in.</p>
                        <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>Welcome to the atelier.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
