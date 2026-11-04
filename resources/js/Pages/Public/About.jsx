import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import Card from '@/Components/UI/Card';
import SafeImage from '@/Components/SafeImage';

gsap.registerPlugin(ScrollTrigger);

const team = [
    { name: 'Sarah Chen', role: 'Founder & CEO', bio: 'Fifteen years shaping quiet, well-run coworking rooms.' },
    { name: 'Marcus Johnson', role: 'Head of Operations', bio: 'Ensures every room is ready before you arrive.' },
    { name: 'Emily Rodriguez', role: 'Community Manager', bio: 'Builds the community behind the walls.' },
    { name: 'David Kim', role: 'Head of Design', bio: 'Creates inspiring and functional workspace designs.' },
];

const milestones = [
    { year: 2018, title: 'Founded', desc: 'Aurelia opened its first location in downtown Tech City with just 20 desks.' },
    { year: 2019, title: 'Expansion', desc: 'Opened two new locations and reached 500 members across the city.' },
    { year: 2020, title: 'Community Growth', desc: 'Launched virtual memberships and grew our community to 2,000 members.' },
    { year: 2021, title: 'National Reach', desc: 'Expanded to 5 cities with 12 locations nationwide.' },
    { year: 2023, title: 'Innovation Hub', desc: 'Launched our innovation lab program, partnering with startups and investors.' },
    { year: 2024, title: 'Global Vision', desc: 'Announced international expansion with locations in Europe and Asia.' },
];

function TimelineAnimation() {
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = timelineRef.current.querySelectorAll('.milestone-item');
            gsap.fromTo(items,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', toggleActions: 'play none none none' },
                }
            );
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={timelineRef} className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: 'var(--color-border)' }} />
            <div className="space-y-12">
                {milestones.map((m, i) => (
                    <div key={i} className="milestone-item relative pl-0 md:pl-20">
                        <div className="hidden md:flex absolute left-4 w-8 h-8 rounded-full items-center justify-center -translate-x-1/2 top-1" style={{ backgroundColor: 'var(--color-subtle)', border: '1px solid var(--color-border)' }}>
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                        </div>
                        <Card className="p-6" hover={false}>
                            <span className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--color-accent)' }}>{m.year}</span>
                            <h3 className="text-lg font-display font-medium mt-1" style={{ color: 'var(--color-text)' }}>{m.title}</h3>
                            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{m.desc}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function About() {
    return (
        <div>
            <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Our Story</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[0.96] mb-6 text-balance">Work should<br /><em className="italic font-normal">inspire</em></h1>
                        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Aurelia exists so that the place you work can be as considered as the work itself.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <div>
                                <p className="eyebrow mb-6"><span className="deco-dot" />From a Single Room</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium leading-[1.05] mb-6 text-balance">From a simple idea to a <em className="italic font-normal">considered community</em></h2>
                                <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                    <p>Aurelia was born from a simple idea: work should be inspiring. Founded in 2018, we started with a single room and a handful of members who believed in the quiet power of a well-run workspace.</p>
                                    <p>Today, we operate across multiple cities, serving thousands of members, from freelancers and startups to enterprise teams. Every room we compose is designed for focus, warmth, and genuine connection.</p>
                                    <p>We believe the future of work is flexible, collaborative, and human-centered. Our spaces reflect that philosophy: thoughtful design, warm light, and no unnecessary noise.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="right">
                            <div className="rounded-[24px] overflow-hidden h-80 sm:h-96" style={{ border: '1px solid var(--color-border)' }}>
                                <SafeImage src="/images/interior.jpg" alt="Inside the Aurelia corridor, glass-walled meeting rooms" className="w-full h-full object-cover" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: 'var(--color-subtle)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="eyebrow justify-center mb-6"><span className="deco-dot" />The House</p>
                            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.02] mb-4">The people <em className="italic font-normal">behind the rooms</em></h2>
                        </div>
                    </ScrollReveal>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <StaggerItem key={i}>
                                <Card className="p-6 text-center h-full" hover={false}>
                                    <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-display font-medium" style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-bg)' }}>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="font-display text-lg font-medium" style={{ color: 'var(--color-text)' }}>{member.name}</h3>
                                    <p className="text-xs uppercase tracking-[0.2em] mt-1.5" style={{ color: 'var(--color-accent)' }}>{member.role}</p>
                                    <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{member.bio}</p>
                                </Card>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Milestones</p>
                            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.02] mb-4">The <em className="italic font-normal">journey</em></h2>
                        </div>
                    </ScrollReveal>
                    <TimelineAnimation />
                </div>
            </section>
        </div>
    );
}
