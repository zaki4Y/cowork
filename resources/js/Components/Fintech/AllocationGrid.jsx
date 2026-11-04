import { motion } from 'framer-motion';

const config = {
    'Stocks': { icon: '📈', bar: '#3F5A38' },
    'Bonds': { icon: '📊', bar: '#7C6F62' },
    'ETFs': { icon: '📦', bar: '#9A6B3F' },
    'Crypto': { icon: '₿', bar: '#C29258' },
};

export default function AllocationGrid({ data = [] }) {
    if (!data?.length) return null;

    return (
        <div className="rounded-[24px] p-6" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-xs uppercase tracking-[0.22em] font-medium mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                Allocation Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {data.map((item, i) => {
                    const cfg = config[item.label] || { icon: '●', bar: '#B7A78F' };
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-2xl p-5 card-hover cursor-default"
                            style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl">{cfg.icon}</span>
                                <span className="text-2xl font-display font-medium" style={{ color: 'var(--color-text)' }}>
                                    {item.percentage}%
                                </span>
                            </div>
                            <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>{item.label}</p>
                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-subtle)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: cfg.bar }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
