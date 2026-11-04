import AdminLayout from '@/Layouts/AdminLayout';
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

export default function BookingsIndex({ bookings }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            router.delete(route('admin.bookings.destroy', id));
        }
    };

    const handleStatusChange = (bookingId, newStatus) => {
        router.put(route('admin.bookings.update', bookingId), { status: newStatus }, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Bookings" />

            <PageTransition>
                <div className="mb-6 transition-colors duration-200">
                    <h1 className="text-2xl font-heading font-bold text-espresso-900">Bookings</h1>
                    <p className="mt-1 text-sm text-sand-600">Manage all bookings across spaces.</p>
                </div>

                <Card className="overflow-hidden" hover={false}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full ">
                            <thead className="bg-sand-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Space</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Start Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">End Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-cream-50">
                                {bookings?.data?.length > 0 ? (
                                    bookings.data.map((booking) => (
                                        <tr key={booking.id} className="admin-row transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-espresso-900">
                                                {booking.user?.name || booking.user_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">
                                                {booking.space?.name || booking.space_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{booking.start_date}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{booking.end_date}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-espresso-900">
                                                ${Number(booking.total_price).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Badge variant={statusVariant[booking.status] || 'default'}>
                                                    {booking.status}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={booking.status}
                                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                        className="rounded-lg border border-sand-300 bg-cream-50 px-3 py-1.5 text-xs focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 transition-shadow"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(booking.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-sm text-sand-500">
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
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                    link.active
                                        ? 'bg-espresso-700 text-cream-50'
                                        : link.url
                                            ? 'bg-cream-50 text-sand-700 hover:bg-sand-200 border border-sand-300'
                                            : 'text-sand-500 cursor-not-allowed'
                                }`}
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </PageTransition>
        </AdminLayout>
    );
}
