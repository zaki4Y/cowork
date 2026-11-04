import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

export default function BlogIndex({ posts }) {
    const handleDelete = (id, title) => {
        if (confirm(`Delete "${title}"? This action cannot be undone.`)) {
            router.delete(route('admin.blog.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Blog" />

            <PageTransition>
                <div className="transition-colors duration-200">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-espresso-900">Blog Posts</h1>
                            <p className="mt-1 text-sm text-sand-600">Manage blog content.</p>
                        </div>
                        <Link href={route('admin.blog.create')}>
                            <Button variant="primary" size="md">Create New Post</Button>
                        </Link>
                    </div>

                    <Card className="overflow-hidden" hover={false}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full ">
                                <thead className="bg-sand-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Published At</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-sand-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-cream-50">
                                    {posts?.data?.length > 0 ? (
                                        posts.data.map((post) => (
                                            <tr key={post.id} className="admin-row transition-colors">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-espresso-900">{post.title}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">
                                                    {post.author?.name || post.author_name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Badge variant={post.is_published ? 'success' : 'warning'}>
                                                        {post.is_published ? 'Published' : 'Draft'}
                                                    </Badge>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-sand-600">
                                                    {post.published_at || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link href={route('admin.blog.edit', post.id)}>
                                                            <Button variant="secondary" size="sm">Edit</Button>
                                                        </Link>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDelete(post.id, post.title)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-sm text-sand-500">
                                                No blog posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {posts?.links && posts.links.length > 3 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {posts.links.map((link, i) => (
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
