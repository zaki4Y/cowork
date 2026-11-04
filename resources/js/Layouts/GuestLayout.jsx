import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashToastListener } from '@/Components/ToastContext';

const navLinks = [
    { label: 'Spaces', route: 'spaces.index' },
    { label: 'Membership', route: 'pricing' },
    { label: 'About', route: 'about' },
    { label: 'Journal', route: 'blog.index' },
];

export default function GuestLayout({ children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <FlashToastListener />
            <nav
                className="fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-500"
                style={{
                    backgroundColor: scrolled ? 'color-mix(in srgb, var(--color-bg) 92%, transparent)' : 'transparent',
                    borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        <Link href="/" className="group">
                            <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.32em]">
                                Aurelia
                            </span>
                            <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-center" style={{ color: 'var(--color-text-secondary)' }}>
                                The Atelier of Work
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.route}
                                    href={route(link.route)}
                                    className="text-[13px] tracking-wide transition-colors"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'}
                                    onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-5 py-2.5 bg-espresso-700 text-cream-50 text-[13px] tracking-wide rounded-full hover:bg-espresso-800 transition-all">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-4 py-2 text-[13px] tracking-wide transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                                        Sign In
                                    </Link>
                                    <Link href={route('contact')} className="px-5 py-2.5 bg-espresso-700 text-cream-50 text-[13px] tracking-wide rounded-full hover:bg-espresso-800 transition-all">
                                        Contact
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 md:hidden">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link key={link.route} href={route(link.route)} className="block px-3 py-2.5 text-sm" onClick={() => setMenuOpen(false)} style={{ color: 'var(--color-text-secondary)' }}>
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="my-2 section-divider" />
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="block px-3 py-2.5 text-sm font-medium" style={{ color: 'var(--color-text)' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="block px-3 py-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMenuOpen(false)}>Sign In</Link>
                                        <Link href={route('contact')} className="block px-3 py-2.5 text-sm font-medium" style={{ color: 'var(--color-text)' }} onClick={() => setMenuOpen(false)}>Contact</Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <main className="pt-16 sm:pt-20">{children}</main>
            <footer style={{ backgroundColor: '#211912', color: '#B7A78F' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <div className="md:col-span-4">
                            <div className="mb-5">
                                <span className="font-display text-2xl font-bold uppercase tracking-[0.32em] text-cream-50">Aurelia</span>
                                <p className="text-[10px] uppercase tracking-[0.3em] mt-1.5" style={{ color: '#8F816F' }}>The Atelier of Work</p>
                            </div>
                            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#B7A78F' }}>
                                Considered spaces for considered work. Quiet rooms, warm light, and the calm luxury of a place designed around you.
                            </p>
                            <div className="flex gap-3 mt-6">
                                {[
                                    { d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                                    { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                                    { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                                ].map((icon, i) => (
                                    <span key={i} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{ backgroundColor: '#33261C', color: '#B7A78F' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = '#9A6B3F'; e.currentTarget.style.color = '#F5EFE6'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = '#33261C'; e.currentTarget.style.color = '#B7A78F'; }}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={icon.d} /></svg>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-2 md:col-start-7">
                            <h4 className="text-cream-50 text-xs uppercase tracking-[0.22em] mb-5">Explore</h4>
                            <div className="space-y-3">
                                <Link href={route('spaces.index')} className="block text-sm transition-colors hover:text-bronze-300" style={{ color: '#B7A78F' }}>Spaces</Link>
                                <Link href={route('pricing')} className="block text-sm transition-colors hover:text-bronze-300" style={{ color: '#B7A78F' }}>Membership</Link>
                                <Link href={route('about')} className="block text-sm transition-colors hover:text-bronze-300" style={{ color: '#B7A78F' }}>About</Link>
                                <Link href={route('blog.index')} className="block text-sm transition-colors hover:text-bronze-300" style={{ color: '#B7A78F' }}>Journal</Link>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-cream-50 text-xs uppercase tracking-[0.22em] mb-5">House</h4>
                            <div className="space-y-3">
                                <Link href={route('contact')} className="block text-sm transition-colors hover:text-bronze-300" style={{ color: '#B7A78F' }}>Contact</Link>
                                <span className="block text-sm" style={{ color: '#6E563C' }}>FAQs</span>
                                <span className="block text-sm" style={{ color: '#6E563C' }}>Privacy Policy</span>
                                <span className="block text-sm" style={{ color: '#6E563C' }}>Terms of Service</span>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="text-cream-50 text-xs uppercase tracking-[0.22em] mb-5">Contact</h4>
                            <div className="space-y-3 text-sm" style={{ color: '#B7A78F' }}>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0" style={{ color: '#9A6B3F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    hello@aurelia.studio
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0" style={{ color: '#9A6B3F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    +1 (555) 123-4567
                                </p>
                                <p className="flex items-center gap-2">
                                    <svg className="w-4 h-4 shrink-0" style={{ color: '#9A6B3F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    12 Aurelia Court, Tech City
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid rgba(154,107,63,0.2)', color: '#6E563C' }}>
                        <p>&copy; {new Date().getFullYear()} Aurelia. All rights reserved.</p>
                        <p className="tracking-[0.25em] uppercase">Considered, always</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
