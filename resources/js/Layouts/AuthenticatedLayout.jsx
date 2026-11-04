import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashToastListener } from '@/Components/ToastContext';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <FlashToastListener />
            <nav className="fixed top-0 left-0 right-0 z-50 nav-blur" style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 92%, transparent)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.32em]">
                                Aurelia
                            </Link>
                            <div className="hidden md:flex items-center gap-6">
                                <Link href={route('dashboard')} className="text-[13px] tracking-wide transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>Dashboard</Link>
                                <Link href={route('dashboard.bookings')} className="text-[13px] tracking-wide transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>My Bookings</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="hidden md:relative md:inline-block">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full transition-colors" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-bg)' }}>{auth.user?.name?.charAt(0)?.toUpperCase()}</span>
                                    <span className="hidden lg:inline text-sm" style={{ color: 'var(--color-text)' }}>{auth.user?.name}</span>
                                    <svg className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute right-0 mt-2 w-52 rounded-2xl py-2 z-50 overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: '0 16px 48px rgba(51,38,28,0.14)' }}>
                                            <Link href={route('profile.edit')} className="block px-4 py-2 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setUserMenuOpen(false)} onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>Profile</Link>
                                            <Link href={route('dashboard.bookings')} className="block px-4 py-2 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setUserMenuOpen(false)} onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>My Bookings</Link>
                                            <div style={{ borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
                                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm" style={{ color: 'var(--destructive)' }} onClick={() => setUserMenuOpen(false)} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Log Out</Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                            <div className="px-4 py-4 space-y-1">
                                <Link href={route('dashboard')} className="block px-3 py-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                <Link href={route('dashboard.bookings')} className="block px-3 py-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMenuOpen(false)}>My Bookings</Link>
                                <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0' }} />
                                <Link href={route('profile.edit')} className="block px-3 py-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }} onClick={() => setMenuOpen(false)}>Profile</Link>
                                <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-3 py-2.5 text-sm" style={{ color: 'var(--destructive)' }} onClick={() => setMenuOpen(false)}>Log Out</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            {header && (
                <div style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'color-mix(in srgb, var(--color-surface) 60%, transparent)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {header}
                    </div>
                </div>
            )}
            <main className="pt-16 sm:pt-[4.5rem]">
                {children}
            </main>
        </div>
    );
}
