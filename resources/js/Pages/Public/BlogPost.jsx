import { Link } from '@inertiajs/react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import SafeImage from '@/Components/SafeImage';

export default function BlogPost({ post, recentPosts }) {
    return (
        <div>
            <div className="relative h-[44vh] sm:h-[54vh] overflow-hidden" style={{ backgroundColor: 'var(--color-subtle)' }}>
                {post.featured_image ? (
                    <SafeImage src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                ) : null}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,12,0.85) 0%, rgba(26,18,12,0.3) 55%, rgba(26,18,12,0.35) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                    <div className="max-w-7xl mx-auto">
                        <Link href={route('blog.index')} className="text-xs uppercase tracking-[0.22em] inline-flex items-center gap-2 transition-colors" style={{ color: 'rgba(245,239,230,0.7)' }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5m0 0l7 7m-7-7l7-7" /></svg>
                            The Journal
                        </Link>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-cream-50 mt-4 max-w-4xl leading-[1.02] text-balance">{post.title}</h1>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] mt-5" style={{ color: 'rgba(245,239,230,0.7)' }}>
                            <span>{post.author?.name}</span>
                            <span className="deco-dot" />
                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <article className="lg:col-span-2">
                            <ScrollReveal>
                                <div className="prose prose-stone max-w-none leading-relaxed prose-headings:font-display prose-headings:font-medium prose-headings:text-espresso-900 prose-a:text-bronze-700 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-bronze-400 prose-blockquote:font-display prose-blockquote:italic" dangerouslySetInnerHTML={{ __html: post.content }} />
                            </ScrollReveal>
                        </article>

                        <aside className="lg:col-span-1">
                            <ScrollReveal direction="right">
                                <div className="sticky top-24">
                                    <h3 className="text-xs uppercase tracking-[0.25em] mb-5" style={{ color: 'var(--color-text-secondary)' }}>Recent Entries</h3>
                                    <div className="space-y-5">
                                        {(recentPosts || []).map((rp) => (
                                            <Link key={rp.id} href={route('blog.show', rp.id)} className="flex gap-4 group">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-subtle)' }}>
                                                    <SafeImage src={rp.featured_image} alt="" className="w-full h-full object-cover" fallback={<div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-6 h-6" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                                    </div>} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium leading-snug transition-colors line-clamp-2" style={{ color: 'var(--color-text)' }}>{rp.title}</p>
                                                    <p className="text-[10px] uppercase tracking-[0.18em] mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>{new Date(rp.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {(!recentPosts || recentPosts.length === 0) && (
                                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No recent entries yet.</p>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
