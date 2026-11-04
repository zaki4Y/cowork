import { Link } from '@inertiajs/react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import SafeImage from '@/Components/SafeImage';

export default function Blog({ posts }) {
    return (
        <div>
            <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Journal</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[0.96] mb-6 text-balance">Notes from<br /><em className="italic font-normal">the atelier</em></h1>
                        <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Insights, essays, and quiet observations from the world of considered work.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="pb-24" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.data.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--color-subtle)' }}>
                                <svg className="w-7 h-7" style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                            </div>
                            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Nothing published yet. Check back soon.</p>
                        </div>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post) => (
                                <StaggerItem key={post.id}>
                                    <Link href={route('blog.show', post.id)} className="group block">
                                        <div className="aspect-[16/10] overflow-hidden rounded-[20px] mb-6" style={{ border: '1px solid var(--color-border)' }}>
                                            <SafeImage
                                                src={post.featured_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                                fallback={<div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-subtle)' }}>
                                                    <svg className="w-10 h-10" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                                </div>}
                                            />
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>{post.author?.name} · {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        <h3 className="text-2xl font-display font-medium leading-snug transition-colors group-hover:text-bronze-700">{post.title}</h3>
                                        <p className="text-base mt-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{post.excerpt}</p>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}

                    {posts.links && posts.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-14">
                            {posts.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={'px-4 py-2 text-sm rounded-full transition-all font-medium ' + (link.active ? 'bg-espresso-700 text-cream-50' : '') + (!link.url ? ' opacity-50 cursor-not-allowed' : '')}
                                    style={link.active ? {} : { color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
