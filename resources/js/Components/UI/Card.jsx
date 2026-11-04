import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, brutal = false }) {
    return (
        <motion.div
            whileHover={hover ? { y: -3 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`bg-cream-50 rounded-[20px] ${brutal ? '' : 'border'} shadow-premium ${className}`}
            style={brutal ? undefined : { borderColor: 'var(--color-border)' }}
        >
            {children}
        </motion.div>
    );
}
