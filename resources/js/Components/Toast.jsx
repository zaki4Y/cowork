import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const icons = {
    success: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

const styles = {
    success: 'bg-[#E6EFE4] border-[#CBDCBE] text-[#3F5A38]',
    error: 'bg-[#F6E3DE] border-[#E3B8AC] text-[#8F3B2A]',
    warning: 'bg-bronze-100 border-bronze-300 text-bronze-800',
    info: 'bg-sand-200 border-sand-300 text-espresso-800',
};

const iconStyles = {
    success: 'bg-[#3F5A38] text-cream-50',
    error: 'bg-[#B3402E] text-cream-50',
    warning: 'bg-bronze-600 text-cream-50',
    info: 'bg-espresso-700 text-cream-50',
};

export default function Toast({ id, type = 'info', message, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => onDismiss(id), 4000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-warm max-w-sm w-full ${styles[type]}`}
        >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${iconStyles[type]}`}>
                {icons[type]}
            </span>
            <p className="text-sm font-medium leading-snug pt-0.5 flex-1">{message}</p>
            <button
                onClick={() => onDismiss(id)}
                className="shrink-0 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </motion.div>
    );
}
