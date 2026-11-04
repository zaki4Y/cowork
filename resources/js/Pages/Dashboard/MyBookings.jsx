import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

const statusVariant = {
    pending: 'warning',
    confirmed: 'info',
    cancelled: 'danger',
    completed: 'success',
};

export default function MyBookings({ bookings }) {
    const handleCancel = (id) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            router.delete(route('bookings.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-sm uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-secondary)' }}>
                    Membership — Bookings
                </h2>
            }
        >
            <Head title="My Bookings" />

            <PageTransition>
                <div className="py-14">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl sm:text-4xl font-display font-medium" style={{ color: 'var(--color-text)' }}>My <em className="italic font-normal">Bookings</em></h1>
                            <Link href={route('spaces.index')}>
                                <Button variant="primary" size="sm">Book a Space</Button>
                            </Link>
                        </div>

                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full" style={{ borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: 'var(--color-subtle)' }}>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>Space</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>End Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ backgroundColor: 'var(--color-surface)' }}>
                                        {bookings?.data?.length > 0 ? (
                                            bookings.data.map((booking) => (
                                                <tr key={booking.id} style={{ borderTop: '1px solid var(--color-border)' }}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                                                        {booking.space?.name || booking.space_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{booking.start_date}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{booking.end_date}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <Badge variant={statusVariant[booking.status] || 'default'}>
                                                            {booking.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                                                        ${Number(booking.total_price).toFixed(2)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {booking.status === 'pending' && (
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleCancel(booking.id)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-12 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                    No bookings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {bookings?.links && bookings.links.length > 3 && (
                            <div className="mt-6 flex items-center justify-center gap-2">
                                {bookings.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={'px-3 py-2 text-sm rounded-full transition-colors font-medium ' + (
                                            link.active
                                                ? 'bg-espresso-700 text-cream-50'
                                                : link.url
                                                    ? ''
                                                    : 'opacity-50 cursor-not-allowed'
                                        )}
                                        style={link.active || !link.url ? undefined : { color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </PageTransition>
        </AuthenticatedLayout>
    );
}
