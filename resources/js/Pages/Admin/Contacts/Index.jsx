import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

export default function ContactsIndex({ inquiries }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(route('admin.contacts.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Contact Inquiries" />

            <PageTransition>
                <div className="transition-colors duration-200">
                    <div className="mb-6">
                        <h1 className="text-2xl font-heading font-bold text-espresso-900">Contact Inquiries</h1>
                        <p className="mt-1 text-sm text-sand-600">View messages from visitors.</p>
                    </div>

                    <Card className="overflow-hidden" hover={false}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full ">
                                <thead className="bg-sand-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-cream-50">
                                    {inquiries?.data?.length > 0 ? (
                                        inquiries.data.map((inquiry) => (
                                            <tr key={inquiry.id} className="admin-row transition-colors">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-espresso-900">{inquiry.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{inquiry.email}</td>
                                                <td className="max-w-xs truncate px-6 py-4 text-sm text-sand-600">
                                                    {inquiry.message?.substring(0, 80)}
                                                    {(inquiry.message?.length || 0) > 80 ? '...' : ''}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Badge variant={inquiry.is_read ? 'success' : 'warning'}>
                                                        {inquiry.is_read ? 'Read' : 'Unread'}
                                                    </Badge>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{inquiry.created_at}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={route('admin.contacts.show', inquiry.id)}>
                                                            <Button variant="secondary" size="sm">View</Button>
                                                        </Link>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(inquiry.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-sm text-sand-500">
                                                No inquiries found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {inquiries?.links && inquiries.links.length > 3 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {inquiries.links.map((link, i) => (
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
                </div>
            </PageTransition>
        </AdminLayout>
    );
}
