import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

export default function UsersIndex({ users }) {
    const handleDelete = (user) => {
        if (user.role === 'admin') {
            return;
        }
        if (confirm(`Delete user "${user.name}"? This action cannot be undone.`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <PageTransition>
                <div className="mb-6 transition-colors duration-200">
                    <h1 className="text-2xl font-heading font-bold text-espresso-900">Users</h1>
                    <p className="mt-1 text-sm text-sand-600">Manage all registered users.</p>
                </div>

                <Card className="overflow-hidden" hover={false}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full ">
                            <thead className="bg-sand-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-cream-50">
                                {users?.data?.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr key={user.id} className="admin-row transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-espresso-900">{user.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{user.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">{user.created_at}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {user.role !== 'admin' && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(user)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-sm text-sand-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {users?.links && users.links.length > 3 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {users.links.map((link, i) => (
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
