import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center text-center px-4" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <p className="eyebrow justify-center mb-8"><span className="deco-dot" />Premium Coworking Atelier</p>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight mb-6">AURELIA</h1>
            <p className="max-w-md text-lg leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
                The atelier of work. Considered spaces for considered work.
            </p>
            <Link href={route('home')} className="inline-flex items-center px-8 py-3 rounded-full text-sm tracking-wide bg-espresso-700 text-cream-50 hover:bg-espresso-800 transition-all">
                Enter the Atelier
            </Link>
        </div>
    );
}
