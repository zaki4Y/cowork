import { useForm } from '@inertiajs/react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import Card from '@/Components/UI/Card';

const details = [
    {
        title: 'Email Us',
        value: 'hello@aurelia.studio',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
        title: 'Call Us',
        value: '+1 (555) 123-4567',
        icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
        title: 'Visit Us',
        value: '12 Aurelia Court, Tech City',
        icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    },
];

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <div>
            <section className="pt-20 sm:pt-28 pb-14 sm:pb-20 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-6"><span className="deco-dot" />Correspondence</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[0.96] mb-6 text-balance">Write to<br /><em className="italic font-normal">the house</em></h1>
                        <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>A question about membership, or wish to book a tour. We answer every message, usually within a day.</p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="pb-24" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <ScrollReveal>
                                <Card className="p-8" hover={false}>
                                    <h2 className="text-2xl sm:text-3xl font-display font-medium mb-8" style={{ color: 'var(--color-text)' }}>Send us a message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <Input
                                            label="Full Name"
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            error={errors.name}
                                            placeholder="John Doe"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                error={errors.email}
                                                placeholder="john@example.com"
                                            />
                                            <Input
                                                label="Phone Number"
                                                type="tel"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                error={errors.phone}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-espresso-800 mb-1.5">Message</label>
                                            <textarea
                                                id="message"
                                                className={`w-full rounded-2xl border ${errors.message ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-espresso-900 px-5 py-3 text-sm placeholder:text-sand-500 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200`}
                                                rows="5"
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                placeholder="Tell us how we can help..."
                                            />
                                            {errors.message && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.message}</p>}
                                        </div>
                                        <Button type="submit" variant="primary" size="lg" disabled={processing}>
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                                    Sending
                                                </span>
                                            ) : 'Send Message'}
                                        </Button>
                                    </form>
                                </Card>
                            </ScrollReveal>
                        </div>

                        <div>
                            <ScrollReveal direction="right">
                                <div className="space-y-5">
                                    {details.map((item) => (
                                        <Card key={item.title} className="p-6" hover={false}>
                                            <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-accent-subtle)' }}>
                                                <svg className="w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                                            </div>
                                            <h3 className="text-xs uppercase tracking-[0.22em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>{item.title}</h3>
                                            <p className="text-sm" style={{ color: 'var(--color-text)' }}>{item.value}</p>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
