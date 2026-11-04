import { Link } from '@inertiajs/react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import Button from '@/Components/UI/Button';

function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ScrollReveal>
                    <p className="eyebrow justify-center mb-8"><span className="deco-dot" />Error 404</p>
                    <h1 className="font-display font-medium leading-[0.96] tracking-tight text-balance" style={{ color: 'var(--color-text)' }}>
                        <span className="block text-[7rem] sm:text-[10rem] lg:text-[12rem]">4<em className="italic font-normal" style={{ color: 'var(--color-accent)' }}>0</em>4</span>
                    </h1>
                    <p className="text-lg max-w-md mx-auto mt-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        The room you are looking for does not exist. It may have moved, or never opened at all.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <Link href={route('home')}>
                            <Button variant="primary" size="lg">Return Home</Button>
                        </Link>
                        <Link href={route('spaces.index')}>
                            <Button variant="outline" size="lg">Explore Spaces</Button>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}

export default NotFoundPage;
