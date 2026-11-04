import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

const typeLabels = {
    hot_desk: 'Hot Desk',
    private_office: 'Private Office',
    meeting_room: 'Meeting Room',
    virtual_office: 'Virtual Office',
};

export default function SpacesIndex({ spaces }) {
    const handleDelete = (id, name) => {
        if (confirm(`Delete "${name}"? This action cannot be undone.`)) {
            router.delete(route('admin.spaces.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Spaces" />

            <PageTransition>
                <div className="mb-6 flex items-center justify-between transition-colors duration-200">
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-espresso-900">Spaces</h1>
                        <p className="mt-1 text-sm text-sand-600">Manage all coworking spaces.</p>
                    </div>
                    <Link href={route('admin.spaces.create')}>
                        <Button variant="primary" size="md">Create New Space</Button>
                    </Link>
                </div>

                <Card className="overflow-hidden" hover={false}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full ">
                            <thead className="bg-sand-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Capacity</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Price / Day</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-cream-50">
                                {spaces?.data?.length > 0 ? (
                                    spaces.data.map((space) => (
                                        <tr key={space.id} className="admin-row transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-espresso-900">{space.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{typeLabels[space.type] || space.type}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{space.capacity}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">
                                                ${Number(space.price_per_day).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Badge variant={space.is_available ? 'success' : 'danger'}>
                                                    {space.is_available ? 'Available' : 'Unavailable'}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link href={route('admin.spaces.edit', space.id)}>
                                                        <Button variant="secondary" size="sm">Edit</Button>
                                                    </Link>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(space.id, space.name)}
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
                                            No spaces found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {spaces?.links && spaces.links.length > 3 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {spaces.links.map((link, i) => (
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
