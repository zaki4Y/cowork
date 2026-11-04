import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { motion } from 'framer-motion';

const tiles = [
    {
        title: 'My Bookings',
        description: 'View and manage your private bookings',
        cta: 'View Bookings',
        route: 'dashboard.bookings',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
        title: 'Profile',
        description: 'Update your personal information',
        cta: 'Edit Profile',
        route: 'profile.edit',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
        title: 'The Collection',
        description: 'Browse every space in the house',
        cta: 'Explore Spaces',
        route: 'spaces.index',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
];

export default function DashboardIndex({ auth }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-sm uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-secondary)' }}>
                    Membership
                </h2>
            }
        >
            <Head title="Dashboard" />

            <PageTransition>
                <div className="py-14">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                        <div className="mb-10">
                            <motion.h1
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-5xl font-display font-medium leading-[1.02]" style={{ color: 'var(--color-text)' }}
                            >
                                Welcome back, <em className="italic font-normal">{user.name}</em>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-3" style={{ color: 'var(--color-text-secondary)' }}
                            >
                                Your room, your reservations, your membership. All in one quiet place.
                            </motion.p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {tiles.map((tile, i) => (
                                <motion.div
                                    key={tile.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + i * 0.08 }}
                                >
                                    <Card className="p-6 h-full flex flex-col" hover={false}>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full shrink-0" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                                                <svg className="h-5 w-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tile.icon} />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-medium" style={{ color: 'var(--color-text)' }}>{tile.title}</h3>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{tile.description}</p>
                                        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                                            <Link href={route(tile.route)}>
                                                <Button variant="outline" size="sm">{tile.cta}</Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageTransition>
        </AuthenticatedLayout>
    );
}
