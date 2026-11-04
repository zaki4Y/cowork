import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import SafeImage from '@/Components/SafeImage';

export default function BlogForm({ post }) {
    const isEdit = !!post;

    const { data, setData, post: submitPost, put, processing, errors } = useForm({
        title: post?.title || '',
        content: post?.content || '',
        excerpt: post?.excerpt || '',
        featured_image: null,
        is_published: post?.is_published ?? false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.blog.update', post.id));
        } else {
            submitPost(route('admin.blog.store'));
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? 'Edit Post' : 'Create Post'} />

            <PageTransition>
                <div className="transition-colors duration-200">
                    <div className="mb-6">
                        <h1 className="text-2xl font-heading font-bold text-espresso-900">
                            {isEdit ? 'Edit Post' : 'Create New Post'}
                        </h1>
                        <p className="mt-1 text-sm text-sand-600">
                            {isEdit ? 'Update the blog post below.' : 'Write a new blog post.'}
                        </p>
                    </div>

                    <Card className="max-w-3xl p-6" hover={false}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                            />

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Excerpt</label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={3}
                                    className={`w-full rounded-xl border ${errors.excerpt ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-espresso-900 px-4 py-2.5 text-sm placeholder:text-sand-500 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200`}
                                    placeholder="Brief summary of the post..."
                                />
                                {errors.excerpt && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.excerpt}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Featured Image</label>
                                {post?.featured_image && !data.featured_image && (
                                    <div className="mb-3 rounded-xl overflow-hidden w-full max-w-sm border border-sand-300">
                                        <SafeImage src={post.featured_image} alt="" className="w-full h-40 object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('featured_image', e.target.files[0])}
                                    className={`w-full rounded-xl border ${errors.featured_image ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bronze-50 file:text-bronze-700 hover:file:bg-bronze-100  transition-all duration-200`}
                                />
                                {errors.featured_image && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.featured_image}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Content</label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={12}
                                    className={`w-full rounded-xl border ${errors.content ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-espresso-900 px-4 py-2.5 text-sm placeholder:text-sand-500 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200`}
                                    placeholder="Write your post content here..."
                                />
                                {errors.content && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.content}</p>}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="h-4 w-4 rounded border-sand-300  text-bronze-600 focus:ring-bronze-500/40"
                                />
                                <label htmlFor="is_published" className="text-sm font-medium text-espresso-800">
                                    Publish immediately
                                </label>
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-sand-200 ">
                                <Button variant="primary" type="submit" disabled={processing}>
                                    {isEdit ? 'Update Post' : 'Create Post'}
                                </Button>
                                <Link href={route('admin.blog.index')}>
                                    <Button variant="secondary" type="button">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </Card>
                </div>
            </PageTransition>
        </AdminLayout>
    );
}
