import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, TrendingUp, CreditCard, Wallet,
    Activity, Settings, Search, Bell, LogOut, Menu, X,
} from 'lucide-react';
import { FlashToastListener } from '@/Components/ToastContext';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, route: 'admin.dashboard', match: 'admin.dashboard' },
    { label: 'Investment', icon: TrendingUp, route: 'admin.spaces.index', match: 'admin.spaces' },
    { label: 'Card', icon: CreditCard, route: 'admin.bookings.index', match: 'admin.bookings' },
    { label: 'Savings', icon: Wallet, route: 'admin.users.index', match: 'admin.users' },
    { label: 'Activity', icon: Activity, route: 'admin.blog.index', match: 'admin.blog' },
    { label: 'Settings', icon: Settings, route: 'admin.contacts.index', match: 'admin.contacts' },
];

export default function AdminLayout({ children }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (match) => {
        const routeUrl = route(match);
        const normalizedUrl = url.replace(/\/+$/, '');
        const base = routeUrl.replace(/\/+$/, '');

        if (match === 'admin.dashboard') {
            return normalizedUrl === base;
        }

        return normalizedUrl === base || normalizedUrl.startsWith(base + '/');
    };

    return (
        <div className="min-h-screen antialiased" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <FlashToastListener />

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 h-16"
                 style={{ background: 'color-mix(in srgb, var(--color-surface) 88%, transparent)', backdropFilter: 'blur(24px) saturate(1.2)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between h-full px-4 lg:px-6">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <Link href={route('admin.dashboard')} className="flex items-center gap-3 shrink-0">
                            <span className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.28em]" style={{ color: 'var(--color-text)' }}>
                                Aurelia
                            </span>
                            <span className="hidden sm:inline text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-[0.18em]"
                                  style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-bg)' }}>
                                Atelier
                            </span>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav Tabs */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.match);
                            return (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    className={`relative flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                                        active
                                            ? 'bg-espresso-700 text-cream-50'
                                            : 'hover:bg-sand-200'
                                    }`}
                                    style={!active ? { color: 'var(--color-text-secondary)' } : undefined}
                                >
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right: Search, Bell, User */}
                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Search className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors relative"
                                style={{ color: 'var(--color-text-secondary)' }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-bronze-500" />
                        </button>
                        <div className="flex items-center gap-2 pl-2 ml-1" style={{ borderLeft: '1px solid var(--color-border)' }}>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                                 style={{ backgroundColor: 'var(--color-brand)', color: 'var(--color-bg)' }}>
                                {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="hidden lg:inline text-sm" style={{ color: 'var(--color-text)' }}>
                                {auth.user?.name || 'User'}
                            </span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <LogOut className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Collapsed Sidebar (Desktop) */}
            <aside className="fixed left-0 top-16 bottom-0 w-16 hidden lg:flex flex-col items-center py-4 gap-2 z-40"
                   style={{ borderRight: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.match);
                    return (
                        <Link
                            key={item.route}
                            href={route(item.route)}
                            className="group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                        >
                            <div className={`sidebar-icon ${active ? 'active' : ''}`}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <span className="side-tooltip">{item.label}</span>
                        </Link>
                    );
                })}
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                        style={{ backgroundColor: 'rgba(33, 25, 18, 0.4)' }}
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute left-0 top-0 bottom-0 w-72"
                            style={{ backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <span className="font-display font-bold" style={{ color: 'var(--color-text)' }}>Navigation</span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-subtle)'}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.match);
                                    return (
                                        <Link
                                            key={item.route}
                                            href={route(item.route)}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                                                active ? 'bg-espresso-700 text-cream-50' : ''
                                            }`}
                                            style={!active ? { color: 'var(--color-text-secondary)' } : undefined}
                                        >
                                            <Icon className="w-4.5 h-4.5 shrink-0" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="lg:ml-16 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
