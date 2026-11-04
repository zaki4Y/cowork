import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StaggerContainer({ children, className = '' }) {
    return (
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className={className}>
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = '' }) {
    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
}
