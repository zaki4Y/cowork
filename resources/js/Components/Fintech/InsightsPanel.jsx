import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const tints = [
    { backgroundColor: '#33261C', color: '#F5EFE6' },
    { backgroundColor: '#9A6B3F', color: '#F5EFE6' },
    { backgroundColor: '#EDE5D8', color: '#33261C' },
];

export default function InsightsPanel({ articles = [] }) {
    if (!articles?.length) return null;

    return (
        <div className="rounded-[24px] p-6" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                    Industry Insights
                </h3>
                <button className="text-xs font-medium transition-colors" style={{ color: 'var(--color-accent)' }}>
                    View All
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((article, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl p-5 card-hover cursor-pointer group"
                        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>
                                {article.date}
                            </span>
                            <ArrowUpRight className="w-4 h-4 transition-colors shrink-0 group-hover:text-bronze-600" style={{ color: 'var(--color-border)' }} />
                        </div>
                        <h4 className="text-sm font-medium leading-snug mb-2 line-clamp-2" style={{ color: 'var(--color-text)' }}>
                            {article.title}
                        </h4>
                        <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium"
                                style={tints[i % tints.length]}
                            >
                                {article.author_initials}
                            </div>
                            <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>{article.author}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
