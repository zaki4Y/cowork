import { useState } from 'react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import Button from '@/Components/UI/Button';

const faqs = [
    { q: 'What is included in a coworking membership?', a: 'All memberships include high-speed WiFi, access to common areas, free coffee and tea, printing facilities, and community events. Premium plans include dedicated desks and meeting room credits.' },
    { q: 'Can I switch between plans?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.' },
    { q: 'Is there a minimum commitment?', a: 'Our monthly plans have no long-term commitment. You can cancel anytime with 30 days notice. Annual plans offer the best value with a 12-month commitment.' },
    { q: 'Can I book a space for a single day?', a: 'Absolutely. We offer day passes for all our spaces. Check individual space pages for availability and pricing.' },
    { q: 'Do you offer private offices?', a: 'Yes, we have fully furnished private offices for teams of 1-20 people. Each office is lockable, soundproofed, and comes with ergonomic furniture.' },
    { q: 'What are the operating hours?', a: 'Our spaces are open 24/7 for members with keycard access. Staff is available Monday through Friday, 8 AM to 6 PM.' },
];

export default function Pricing({ plans }) {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div>
            <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Membership</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[0.96] mb-6 text-balance">One price,<br /><em className="italic font-normal">no fine print</em></h1>
                        <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Choose the membership that fits your rhythm. No hidden fees, ever.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="pb-24 sm:pb-28" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                        {(plans || []).map((plan) => (
                            <StaggerItem key={plan.id} className="h-full">
                                <div
                                    className={`h-full flex flex-col rounded-[24px] p-8 sm:p-10 relative ${plan.is_popular ? 'md:-my-4 md:py-14' : ''}`}
                                    style={plan.is_popular
                                        ? { backgroundColor: '#211912', color: '#F5EFE6', border: '1px solid #33261C', boxShadow: '0 24px 60px rgba(33,25,18,0.35)' }
                                        : { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                                >
                                    {plan.is_popular && (
                                        <p className="absolute top-6 right-8 text-[10px] uppercase tracking-[0.25em]" style={{ color: '#D4AF7E' }}>Most Popular</p>
                                    )}
                                    <h3 className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: plan.is_popular ? '#B7A78F' : 'var(--color-text-secondary)' }}>{plan.name}</h3>
                                    <div className="mb-6">
                                        <span className="text-6xl font-display font-medium">${plan.price}</span>
                                        <span className="text-sm ml-2" style={{ color: plan.is_popular ? '#B7A78F' : 'var(--color-text-secondary)' }}>/ month</span>
                                    </div>
                                    <p className="text-sm mb-8 leading-relaxed" style={{ color: plan.is_popular ? '#B7A78F' : 'var(--color-text-secondary)' }}>{plan.description}</p>
                                    <ul className="space-y-4 flex-1 mb-10">
                                        {(plan.features || []).map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: plan.is_popular ? '#EDE3D5' : 'var(--color-text-secondary)' }}>
                                                <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: plan.is_popular ? '#D4AF7E' : 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.is_popular ? (
                                        <Button size="lg" className="w-full" style={{ backgroundColor: '#F5EFE6', color: '#211912' }}>Choose {plan.name}</Button>
                                    ) : (
                                        <Button variant="outline" size="lg" className="w-full">Choose {plan.name}</Button>
                                    )}
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: 'var(--color-subtle)' }}>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Questions</p>
                            <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.02] mb-4 text-balance">Before you <em className="italic font-normal">ask</em></h2>
                            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Everything you need to know about membership.</p>
                        </div>
                    </ScrollReveal>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 0.04}>
                                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        className="w-full flex items-center justify-between px-6 py-5 text-left font-medium gap-4" style={{ color: 'var(--color-text)' }}
                                    >
                                        <span>{faq.q}</span>
                                        <svg className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>{faq.a}</div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
