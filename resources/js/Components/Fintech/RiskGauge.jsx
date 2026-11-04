import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function RiskGauge({ score = 72, change = '+4%' }) {
    const radius = 80;
    const circumference = Math.PI * radius;
    const clampedScore = Math.min(100, Math.max(0, score));
    const fillLength = (clampedScore / 100) * circumference;
    const centerX = 100;
    const centerY = 90;

    const getColor = (val) => {
        if (val >= 70) return '#3F5A38';
        if (val >= 40) return '#9A6B3F';
        return '#B3402E';
    };

    const arcColor = getColor(clampedScore);

    return (
        <div className="rounded-[24px] p-6 flex flex-col items-center" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-xs uppercase tracking-[0.22em] font-medium self-start mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Occupancy Score
            </h3>

            <svg width="200" height="110" viewBox="0 0 200 110" className="-ml-2">
                <path
                    d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                    className="gauge-empty"
                />
                <motion.path
                    d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                    className="gauge-fill"
                    stroke={arcColor}
                    strokeDasharray={`${fillLength} ${circumference}`}
                    strokeDashoffset={0}
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${fillLength} ${circumference}` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <motion.text
                    x={centerX}
                    y={centerY - 8}
                    textAnchor="middle"
                    fill="#2E241B"
                    style={{ fontSize: 28, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {clampedScore}
                </motion.text>
                <text
                    x={centerX}
                    y={centerY + 14}
                    textAnchor="middle"
                    fill="rgba(51,38,28,0.4)"
                    style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}
                >
                    / 100
                </text>
            </svg>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 mt-1 px-3 py-1.5 rounded-full bg-[#E6EFE4]"
            >
                <TrendingUp className="w-3.5 h-3.5 text-[#3F5A38]" />
                <span className="text-xs font-medium text-[#3F5A38]">
                    Stability improved by {change}
                </span>
            </motion.div>
        </div>
    );
}
