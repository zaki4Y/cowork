import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, className = '', direction = 'up', delay = 0, duration = 0.5 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
