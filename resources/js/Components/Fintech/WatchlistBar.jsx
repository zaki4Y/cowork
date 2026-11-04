import { TrendingUp, TrendingDown } from 'lucide-react';

const tints = [
    { backgroundColor: '#33261C', color: '#F5EFE6' },
    { backgroundColor: '#9A6B3F', color: '#F5EFE6' },
    { backgroundColor: '#EDE5D8', color: '#33261C' },
    { backgroundColor: '#7C6F62', color: '#F5EFE6' },
    { backgroundColor: '#211912', color: '#D4AF7E' },
];

export default function WatchlistBar({ items = [] }) {
    if (!items?.length) return null;

    const renderItem = (item, idx) => {
        const tint = tints[idx % tints.length];
        const isUp = item.trend === 'up';

        return (
            <div
                key={item.name + idx}
                className="rounded-2xl px-4 py-3 flex items-center gap-3 shrink-0 card-hover cursor-default"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                    style={tint}
                >
                    {item.initials}
                </div>
                <div>
                    <p className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--color-text)' }}>{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-mono font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            ${item.price?.toFixed(2)}
                        </span>
                        <span
                            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                                isUp ? 'text-[#3F5A38]' : 'text-[#8F3B2A]'
                            }`}
                        >
                            {isUp ? (
                                <TrendingUp className="w-3 h-3" />
                            ) : (
                                <TrendingDown className="w-3 h-3" />
                            )}
                            {item.change}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const duplicatedItems = [...items, ...items, ...items];

    return (
        <div className="relative overflow-hidden">
            <div className="flex gap-3 ticker-scroll">
                {duplicatedItems.map((item, i) => renderItem(item, i))}
            </div>
        </div>
    );
}
