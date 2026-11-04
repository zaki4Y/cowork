import { Link, useForm } from '@inertiajs/react';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/Components/Animations/StaggerChildren';
import Button from '@/Components/UI/Button';
import SafeImage from '@/Components/SafeImage';

const typeLabels = {
    hot_desk: 'Hot Desk',
    private_office: 'Private Office',
    meeting_room: 'Meeting Room',
    virtual_office: 'Virtual Office',
};

export default function Spaces({ spaces }) {
    const { data, setData, get } = useForm({
        type: '',
        capacity: '',
    });

    function handleFilter(e) {
        e.preventDefault();
        get(route('spaces.index'), { preserveState: true });
    }

    return (
        <div>
            {/* ───── HERO ───── */}
            <section className="pt-20 sm:pt-28 pb-12 sm:pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <p className="eyebrow justify-center mb-6"><span className="deco-dot" />The Collection</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[0.96] mb-6 text-balance">Every room,<br /><em className="italic font-normal">considered</em></h1>
                        <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Hot desks to private offices, each space composed around light, silence, and craft.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ───── FILTERS ───── */}
            <section className="sticky top-16 sm:top-20 z-30 nav-blur" style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 88%, transparent)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end py-4">
                        <div>
                            <label htmlFor="filter-type" className="block text-xs font-medium uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Space Type</label>
                            <select
                                id="filter-type"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="w-48 rounded-full border px-4 py-2 text-sm premium-ring" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                            >
                                <option value="">All Types</option>
                                <option value="hot_desk">Hot Desk</option>
                                <option value="private_office">Private Office</option>
                                <option value="meeting_room">Meeting Room</option>
                                <option value="virtual_office">Virtual Office</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-capacity" className="block text-xs font-medium uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Min Capacity</label>
                            <input
                                id="filter-capacity"
                                type="number"
                                value={data.capacity}
                                onChange={e => setData('capacity', e.target.value)}
                                placeholder="e.g. 2"
                                className="w-44 rounded-full border px-4 py-2 text-sm placeholder:text-sand-400 premium-ring" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                            />
                        </div>
                        <Button type="submit" variant="primary" size="md">Apply Filters</Button>
                    </form>
                </div>
            </section>

            {/* ───── GRID ───── */}
            <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {spaces.data.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--color-subtle)' }}>
                                <svg className="w-7 h-7" style={{ color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>No spaces found matching your criteria.</p>
                            <button onClick={() => { setData('type', ''); setData('capacity', ''); }} className="mt-4 text-sm font-medium underline underline-offset-4 decoration-sand-300" style={{ color: 'var(--color-text)' }}>Clear filters</button>
                        </div>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {spaces.data.map((space) => (
                                <StaggerItem key={space.id}>
                                    <Link href={route('spaces.show', space.id)} className="group block">
                                        <div className="aspect-[4/3] overflow-hidden rounded-[20px] relative" style={{ border: '1px solid var(--color-border)' }}>
                                            <SafeImage
                                                src={space.images?.[0]}
                                                alt={space.name}
                                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(253,251,247,0.92)', color: 'var(--color-text)', backdropFilter: 'blur(6px)' }}>
                                                    {typeLabels[space.type] || space.type}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <span className="text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(33,25,18,0.55)', color: 'var(--color-bg)', backdropFilter: 'blur(6px)' }}>
                                                    Up to {space.capacity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="pt-5">
                                            <p className="text-[10px] uppercase tracking-[0.25em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>{typeLabels[space.type] || space.type} · Tech City</p>
                                            <h3 className="font-display text-2xl font-medium leading-snug">{space.name}</h3>
                                            <p className="text-sm mt-1.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{space.description}</p>
                                            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                                                <span className="font-display text-xl font-medium" style={{ color: 'var(--color-text)' }}>${space.price_per_day}<span className="text-xs font-sans font-normal" style={{ color: 'var(--color-text-secondary)' }}> / day</span></span>
                                                <span className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-1.5 transition-colors group-hover:text-bronze-700" style={{ color: 'var(--color-text-secondary)' }}>
                                                    Reserve
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}

                    {spaces.links && spaces.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-14">
                            {spaces.links.map((link, i) => (
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
