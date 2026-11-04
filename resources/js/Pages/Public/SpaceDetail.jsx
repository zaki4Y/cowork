import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import ScrollReveal from '@/Components/Animations/ScrollReveal';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import SafeImage from '@/Components/SafeImage';

const heroImage = '/images/hero.jpg';

const typeLabels = {
    hot_desk: 'Hot Desk',
    private_office: 'Private Office',
    meeting_room: 'Meeting Room',
    virtual_office: 'Virtual Office',
};

function BookingSuccess({ onClose }) {
    useEffect(() => {
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#9A6B3F', '#C29258', '#D4AF7E'],
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#9A6B3F', '#C29258', '#D4AF7E'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#E6EFE4' }}
            >
                <svg className="w-10 h-10" style={{ color: '#3F5A38' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
            <h3 className="text-2xl font-display font-medium mb-2" style={{ color: 'var(--color-text)' }}>A reserved seat</h3>
            <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">Your space is held. Check your dashboard for the details.</p>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-accent)' }}>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                <span>Taking you to your bookings</span>
            </div>
        </div>
    );
}

export default function SpaceDetail({ space, unavailableDates }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        space_id: space.id,
        start_date: '',
        end_date: '',
        notes: '',
    });

    const images = space.images?.length ? space.images : [heroImage];

    function handleBook(e) {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => {
                setBookingSuccess(true);
            },
        });
    }

    function handleClose() {
        setBookingSuccess(false);
        setShowBooking(false);
        window.location.href = route('dashboard.bookings');
    }

    return (
        <div>
            <div className="relative h-[52vh] sm:h-[64vh] overflow-hidden" style={{ backgroundColor: 'var(--color-subtle)' }}>
                <SafeImage src={images[selectedImage]} alt={space.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,12,0.82) 0%, rgba(26,18,12,0.2) 55%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(253,251,247,0.92)', color: 'var(--color-text)', backdropFilter: 'blur(6px)' }}>
                                {typeLabels[space.type] || space.type}
                            </span>
                            <span className="text-xs uppercase tracking-[0.18em]" style={{ color: 'rgba(245,239,230,0.75)' }}>Up to {space.capacity} people</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-display font-medium text-cream-50 leading-[1.02] text-balance">{space.name}</h1>
                    </div>
                </div>
                {images.length > 1 && (
                    <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex gap-2">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={'w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ' + (i === selectedImage ? 'border-bronze-300 ring-2 ring-bronze-300/30' : 'border-transparent opacity-60 hover:opacity-100 hover:border-cream-50/50')}
                            >
                                <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <ScrollReveal>
                                <span className="eyebrow mb-4"><span className="deco-dot" />Details</span>
                                <h2 className="text-3xl sm:text-4xl font-display font-medium mb-5" style={{ color: 'var(--color-text)' }}>About this space</h2>
                                <p className="leading-relaxed text-lg" style={{ color: 'var(--color-text-secondary)' }}>{space.description}</p>
                            </ScrollReveal>

                            {space.amenities?.length > 0 && (
                                <ScrollReveal className="mt-12">
                                    <h3 className="text-xs uppercase tracking-[0.25em] mb-5" style={{ color: 'var(--color-text-secondary)' }}>Amenities</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {space.amenities.map((amenity) => (
                                            <div key={amenity.id} className="flex items-center gap-3 text-sm rounded-2xl px-4 py-3.5" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                                                <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                                                {amenity.name}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>

                        <div>
                            <ScrollReveal direction="right">
                                <Card className="p-7 sticky top-24" hover={false}>
                                    <h3 className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: 'var(--color-text-secondary)' }}>Pricing</h3>
                                    <div className="space-y-4 mb-8">
                                        {space.price_per_hour && (
                                            <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>Per Hour</span>
                                                <span className="font-medium" style={{ color: 'var(--color-text)' }}>${space.price_per_hour}</span>
                                            </div>
                                        )}
                                        {space.price_per_day && (
                                            <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>Per Day</span>
                                                <span className="font-medium" style={{ color: 'var(--color-text)' }}>${space.price_per_day}</span>
                                            </div>
                                        )}
                                        {space.price_per_month && (
                                            <div className="flex justify-between items-center py-3">
                                                <span style={{ color: 'var(--color-text-secondary)' }}>Per Month</span>
                                                <span className="font-display text-2xl font-medium" style={{ color: 'var(--color-text)' }}>${space.price_per_month}</span>
                                            </div>
                                        )}
                                    </div>
                                    <Button onClick={() => setShowBooking(true)} className="w-full" variant="primary" size="lg">Book This Space</Button>
                                    <p className="text-xs text-center mt-3" style={{ color: 'var(--color-text-secondary)' }}>Free cancellation within 24 hours</p>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            <Modal isOpen={showBooking} onClose={() => { if (!processing) { setShowBooking(false); setBookingSuccess(false); } }} title={bookingSuccess ? undefined : `Reserve ${space.name}`}>
                {bookingSuccess ? (
                    <BookingSuccess onClose={handleClose} />
                ) : (
                    <form onSubmit={handleBook} className="space-y-5 -mt-2">
                        <div>
                            <label htmlFor="start_date" className="block text-xs font-medium uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Start Date</label>
                            <input
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                onChange={e => setData('start_date', e.target.value)}
                                className="w-full rounded-2xl border premium-ring px-4 py-2.5 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.start_date && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.start_date}</p>}
                        </div>
                        <div>
                            <label htmlFor="end_date" className="block text-xs font-medium uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>End Date</label>
                            <input
                                id="end_date"
                                type="date"
                                value={data.end_date}
                                onChange={e => setData('end_date', e.target.value)}
                                className="w-full rounded-2xl border premium-ring px-4 py-2.5 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                                min={data.start_date || new Date().toISOString().split('T')[0]}
                            />
                            {errors.end_date && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.end_date}</p>}
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-xs font-medium uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Notes <span className="normal-case tracking-normal opacity-70">(optional)</span></label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                className="w-full rounded-2xl border premium-ring px-4 py-2.5 text-sm" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                                rows={3}
                                placeholder="Any special requests..."
                            />
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={processing}>
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Confirming
                                </span>
                            ) : 'Confirm Reservation'}
                        </Button>
                    </form>
                )}
            </Modal>
        </div>
    );
}
