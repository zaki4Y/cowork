import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import Counter from '@/Components/Animations/Counter';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import SafeImage from '@/Components/SafeImage';

gsap.registerPlugin(ScrollTrigger);

const heroImage = '/images/hero.jpg';
const interiorImage = '/images/interior.jpg';

const reviews = [
    {
        name: 'Sarah Chen',
        affiliation: 'Product Designer, Nomad Studio',
        quote: 'Aurelia transformed how my team works. The spaces are beautiful, the community is genuine, and the flexibility is exactly what we needed.',
    },
    {
        name: 'Marcus Rivera',
        affiliation: 'Founder, Basecamp Digital',
        quote: 'The private offices are incredible. We went from a noisy cafe to a professional space that actually makes us feel like a real company.',
    },
    {
        name: 'Emily Torres',
        affiliation: 'Creative Director, Craft Studio',
        quote: 'I have been a member for over two years. The community alone is worth it. I found clients, collaborators, and genuine friends here.',
    },
    {
        name: 'James Whitfield',
        affiliation: 'CEO, Vantage Tech',
        quote: 'We scaled from two people to fifteen in under a year. Aurelia grew with us. Same building, bigger office, zero friction.',
    },
];

const typeLabels = {
    hot_desk: 'Hot Desk',
    private_office: 'Private Office',
    meeting_room: 'Meeting Room',
    virtual_office: 'Virtual Office',
};

export default function Home({ featuredSpaces, stats, latestPosts, plans }) {
    const heroRef = useRef(null);
    const bgRef = useRef(null);
    const contentRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const bg = bgRef.current;
        const content = contentRef.current;
        const heading = headingRef.current;
        const sub = content?.querySelector('[data-hero-sub]');
        const ctas = content?.querySelector('[data-hero-ctas]');
        if (!bg || !content) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
        tl.to(bg, { y: '8%', scale: 1.02, ease: 'none' }, 0)
          .to(content, { y: '6%', opacity: 0.25, ease: 'none' }, 0);

        if (heading && sub && ctas) {
            const spans = heading.querySelectorAll('span.word');
            gsap.fromTo(spans,
                { opacity: 0, y: 44, rotateX: -20 },
                { opacity: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.07, ease: 'power4.out', delay: 0.15 }
            );
            gsap.fromTo(sub, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.75 });
            gsap.fromTo(ctas, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.05 });
        }

        return () => { tl.kill(); gsap.killTweensOf([heading, sub, ctas]); };
    }, []);

    const quote = reviews[0];

    return (
        <div>
            {/* ───── HERO ───── */}
            <section ref={heroRef} className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10 sm:pb-14 text-center">
                    <p className="eyebrow justify-center mb-8">
                        <span className="deco-dot" />
                        Premium Coworking Atelier
                    </p>
                    <h1 ref={headingRef} className="font-display font-medium leading-[0.96] tracking-tight text-balance max-w-5xl mx-auto" style={{ color: 'var(--color-text)' }}>
                        <span className="word block text-6xl sm:text-8xl lg:text-[7.5rem]">Spaces</span>
                        <span className="word block text-6xl sm:text-8xl lg:text-[7.5rem]"><em className="italic font-normal" style={{ color: 'var(--color-accent)' }}>Beyond</em> Ordinary</span>
                    </h1>
                    <p data-hero-sub className="text-lg sm:text-xl max-w-md mx-auto mt-8 mb-10 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Quiet rooms, warm light, and the calm luxury of a place designed around the way you work.
                    </p>
                    <div data-hero-ctas className="flex flex-wrap items-center justify-center gap-5">
                        <Link href={route('spaces.index')}>
                            <Button variant="primary" size="lg" className="gap-2 pl-8 pr-6">
                                Explore Spaces
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Button>
                        </Link>
                        <Link href={route('pricing')} className="text-sm tracking-wide underline underline-offset-4 decoration-sand-300 hover:decoration-espresso-700 transition-colors" style={{ color: 'var(--color-text)' }}>
                            View Membership
                        </Link>
                    </div>
                </div>
                <div ref={bgRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
                    <div className="relative rounded-3xl overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: '0 30px 80px rgba(51,38,28,0.18)' }}>
                        <SafeImage src={heroImage} alt="The Aurelia lounge — sunlit coworking with warm timber and linen" className="w-full h-[46vh] sm:h-[60vh] lg:h-[68vh] object-cover" />
                        <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex items-end justify-between gap-6">
                            <p className="text-cream-50 text-xs sm:text-sm uppercase tracking-[0.22em] drop-shadow">The Aurelia Lounge, Tech City</p>
                            <p className="hidden sm:block text-cream-50/90 text-xs uppercase tracking-[0.22em]">Est. 2020</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── PROVEN EXCELLENCE / BUILT ON TRUST ───── */}
            <section className="py-24 sm:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <p className="eyebrow mb-6"><span className="deco-dot" />Proven Excellence</p>
                        <h2 data-toc className="text-4xl sm:text-5xl md:text-6xl font-display font-medium leading-[1.02] mb-4 max-w-3xl text-balance">Built on <em className="italic font-normal">trust</em>, not noise</h2>
                        <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>A decade of quiet hospitality, long-term members, and spaces that earn their reputation one considered detail at a time.</p>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-16">
                        <div className="md:col-span-4 flex flex-col gap-5">
                            <div className="rounded-[20px] p-8 sm:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <div className="text-5xl sm:text-6xl font-display font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                                    <Counter end={stats?.years ?? 6} suffix="+" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-secondary)' }}>Years of Craft</p>
                            </div>
                            <div className="rounded-[20px] p-8 sm:p-10 flex items-center gap-6" style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-bg)' }}>
                                <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245,239,230,0.12)' }}>
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.563.563 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.563.563 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.563.563 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.22em] text-cream-200">Aurelia Choice</p>
                                    <p className="text-sm text-cream-100/80 mt-1 leading-snug">Design-Led Workspace of the Year</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4">
                            <div className="rounded-[20px] overflow-hidden h-full min-h-[320px]" style={{ border: '1px solid var(--color-border)' }}>
                                <SafeImage src={interiorImage} alt="Aurelia interior corridor with glass-walled meeting rooms" className="w-full h-full min-h-[320px] object-cover" />
                            </div>
                        </div>
                        <div className="md:col-span-4 flex flex-col gap-5">
                            <div className="rounded-[20px] p-8 sm:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <div className="text-5xl sm:text-6xl font-display font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                                    <Counter end={98} suffix="%" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-secondary)' }}>Member Satisfaction</p>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="rounded-[20px] p-6" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="text-3xl sm:text-4xl font-display font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                        <Counter end={stats?.spaces ?? 12} suffix="+" />
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-secondary)' }}>Spaces</p>
                                </div>
                                <div className="rounded-[20px] p-6" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                    <div className="text-3xl sm:text-4xl font-display font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                                        <Counter end={stats?.members ?? 10} suffix="+" />
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-secondary)' }}>Members</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── THE AURELIA COLLECTION ───── */}
            {featuredSpaces && featuredSpaces.length > 0 && (
                <section className="py-24 sm:py-32" style={{ backgroundColor: 'var(--color-subtle)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
                                <div className="max-w-2xl">
                                    <p className="eyebrow mb-6"><span className="deco-dot" />Signature Spaces</p>
                                    <h2 data-toc className="text-4xl sm:text-5xl md:text-6xl font-display font-medium leading-[1.02] text-balance">The <em className="italic font-normal">Aurelia</em> Collection</h2>
                                </div>
                                <Link href={route('spaces.index')} className="text-sm tracking-wide underline underline-offset-4 decoration-sand-400 hover:decoration-espresso-700 transition-colors" style={{ color: 'var(--color-text)' }}>
                                    View all spaces
                                </Link>
                            </div>
                        </ScrollReveal>
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {featuredSpaces.slice(0, 4).map((space) => (
                                <StaggerItem key={space.id}>
                                    <Link href={route('spaces.show', space.id)} className="group block">
                                        <div className="aspect-[3/4] overflow-hidden rounded-[20px] mb-5" style={{ border: '1px solid var(--color-border)' }}>
                                            <SafeImage
                                                src={space.images?.[0]}
                                                alt={space.name}
                                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                            />
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--color-text-secondary)' }}>{typeLabels[space.type] || space.type} · Tech City</p>
                                        <h3 className="font-display text-2xl font-medium leading-snug mb-1.5">{space.name}</h3>
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>${space.price_per_day} <span className="opacity-60">/ day</span></p>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>
            )}

            {/* ───── TESTIMONIAL PULL-QUOTE ───── */}
            <section className="py-24 sm:py-28" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <svg className="w-10 h-10 mx-auto mb-8" style={{ color: 'var(--color-accent)' }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10z" /></svg>
                    <blockquote data-toc className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-balance" style={{ color: 'var(--color-text)' }}>
                        “{quote.quote}”
                    </blockquote>
                    <p className="mt-10 text-sm uppercase tracking-[0.25em]" style={{ color: 'var(--color-text)' }}>{quote.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>{quote.affiliation}</p>
                </div>
            </section>

            {/* ───── JOURNAL TEASER ───── */}
            {latestPosts && latestPosts.length > 0 && (
                <section className="py-24 sm:py-28" style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
                                <div>
                                    <p className="eyebrow mb-6"><span className="deco-dot" />Journal</p>
                                    <h2 data-toc className="text-4xl sm:text-5xl font-display font-medium leading-[1.02]">Notes from <em className="italic font-normal">the atelier</em></h2>
                                </div>
                                <Link href={route('blog.index')} className="text-sm tracking-wide underline underline-offset-4 decoration-sand-400 hover:decoration-espresso-700 transition-colors" style={{ color: 'var(--color-text)' }}>
                                    All articles
                                </Link>
                            </div>
                        </ScrollReveal>
                        <div className="max-w-3xl">
                            {latestPosts.map((post, i) => (
                                <ScrollReveal key={post.id} delay={i * 0.08}>
                                    <Link href={route('blog.show', post.id)} className="block py-6 group" style={{ borderBottom: i < latestPosts.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                                        <h3 className="text-xl sm:text-2xl font-display font-medium leading-snug transition-colors group-hover:text-bronze-700">{post.title}</h3>
                                        <p className="text-base mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{post.excerpt}</p>
                                        <div className="flex items-center gap-3 mt-3 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>
                                            <span>{post.author?.name}</span>
                                            <span className="deco-dot" />
                                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── CLOSING CTA BAND ───── */}
            <section className="py-24 sm:py-32" style={{ backgroundColor: '#211912' }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-8" style={{ color: '#9A6B3F' }}><span className="deco-dot" />The Atelier Awaits</p>
                        <h2 data-toc className="text-4xl sm:text-6xl md:text-7xl font-display font-medium leading-[1.0] text-cream-50 text-balance">Come work <em className="italic font-normal" style={{ color: '#D4AF7E' }}>beautifully</em></h2>
                        <p className="text-lg max-w-md mx-auto mt-8 mb-12 leading-relaxed" style={{ color: '#B7A78F' }}>Book a tour, take a day pass, or become a resident member. No commitment required.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href={route('spaces.index')}>
                                <Button size="lg" style={{ backgroundColor: '#F5EFE6', color: '#211912' }} className="hover:!bg-cream-100">Explore Spaces</Button>
                            </Link>
                            <Link href={route('contact')} className="inline-flex items-center px-6 py-3 text-sm tracking-wide rounded-full" style={{ border: '1px solid rgba(245,239,230,0.25)', color: '#F5EFE6' }}>Book a Tour</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
