import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const timeframeFilters = ['1D', '1W', '1M', '3M', '1Y', 'All'];

export default function PortfolioCard({ stats }) {
    const [activeFilter, setActiveFilter] = useState('1Y');
    const chartData = stats.monthlyRevenueChart || [];
    const isPositive = stats.portfolioGrowth >= 0;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            return (
                <div className="px-4 py-3 rounded-2xl bg-espresso-900 text-cream-100 shadow-warm-lg">
                    <p className="text-xs text-cream-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-cream-50">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-[24px] p-6 lg:p-8" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                            Total Portfolio Value
                        </p>
                        <div className="flex items-baseline gap-4 mt-2">
                            <h2 className="text-4xl lg:text-5xl font-display font-medium tracking-tight" style={{ color: 'var(--color-text)' }}>
                                {formatCurrency(stats.totalPortfolioValue)}
                            </h2>
                            <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                    isPositive
                                        ? 'text-[#3F5A38] bg-[#E6EFE4]'
                                        : 'text-[#8F3B2A] bg-[#F6E3DE]'
                                }`}
                            >
                                {isPositive ? (
                                    <TrendingUp className="w-3.5 h-3.5" />
                                ) : (
                                    <TrendingDown className="w-3.5 h-3.5" />
                                )}
                                {isPositive ? '+' : ''}{stats.portfolioGrowth}%
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {stats.assetCards?.map((asset, i) => (
                            <motion.div
                                key={asset.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="rounded-2xl p-4 card-hover cursor-default"
                                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: asset.color }}
                                    />
                                    <span className="text-xs font-medium uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-secondary)' }}>
                                        {asset.label}
                                    </span>
                                </div>
                                <p className="mt-2 text-lg font-display font-medium" style={{ color: 'var(--color-text)' }}>
                                    {formatCurrency(asset.value)}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                                    {asset.percentage}% of portfolio
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Yearly Performance</span>
                        <div className="flex gap-1.5">
                            {timeframeFilters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                                        activeFilter === f
                                            ? 'bg-espresso-700 text-cream-50'
                                            : 'hover:bg-sand-200'
                                    }`}
                                    style={activeFilter === f ? undefined : { color: 'var(--color-text-secondary)' }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9A6B3F" stopOpacity={0.3} />
                                        <stop offset="60%" stopColor="#9A6B3F" stopOpacity={0.08} />
                                        <stop offset="100%" stopColor="#9A6B3F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(51,38,28,0.08)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(51,38,28,0.45)', fontSize: 11 }}
                                    dy={8}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(51,38,28,0.45)', fontSize: 11 }}
                                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                    dx={-4}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={false} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#9A6B3F"
                                    strokeWidth={2}
                                    fill="url(#revenueGradient)"
                                    activeDot={{
                                        r: 5,
                                        fill: '#9A6B3F',
                                        stroke: '#FDFBF7',
                                        strokeWidth: 2,
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
