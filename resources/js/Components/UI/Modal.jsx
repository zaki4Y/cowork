import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 backdrop-blur-sm" style={{ backgroundColor: 'rgba(33, 25, 18, 0.45)' }} onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="relative bg-cream-50 rounded-[20px] max-w-lg w-full p-6 z-10 shadow-premium-lg"
                        style={{ border: '1px solid var(--color-border)' }}
                    >
                        {title && (
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-display font-bold text-espresso-900">{title}</h3>
                                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full text-sand-600 hover:text-espresso-800 hover:bg-sand-200 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        )}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
