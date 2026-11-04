import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-espresso-700 text-cream-50 hover:bg-espresso-800 rounded-full active:scale-[0.97]',
    secondary: 'bg-cream-50 text-espresso-800 rounded-full hover:bg-sand-200 active:scale-[0.97]',
    danger: 'bg-[#B3402E] text-cream-50 hover:bg-[#9A3526] rounded-full active:scale-[0.97]',
    ghost: 'text-sand-700 hover:text-espresso-800 hover:bg-sand-200 rounded-full active:scale-[0.97]',
    outline: 'border border-espresso-700 text-espresso-700 rounded-full hover:bg-espresso-700 hover:text-cream-50 active:scale-[0.97]',
    brutal: 'bg-espresso-700 text-cream-50 rounded-full hover:bg-espresso-800 active:scale-[0.97]',
};

const sizes = {
    sm: 'px-4 py-1.5 text-xs tracking-[0.08em]',
    md: 'px-6 py-2.5 text-sm tracking-[0.04em]',
    lg: 'px-8 py-3 text-base tracking-[0.04em]',
    xl: 'px-10 py-3.5 text-lg tracking-[0.04em]',
    icon: 'w-12 h-12 p-0',
};

const variantMap = {
    default: 'primary',
    outline: 'outline',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
    const resolvedVariant = variantMap[variant] || variant;
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center justify-center font-medium transition-all duration-200 ${variants[resolvedVariant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
