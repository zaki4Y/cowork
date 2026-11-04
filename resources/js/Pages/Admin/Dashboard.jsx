import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PortfolioCard from '@/Components/Fintech/PortfolioCard';
import WatchlistBar from '@/Components/Fintech/WatchlistBar';
import AllocationGrid from '@/Components/Fintech/AllocationGrid';
import RiskGauge from '@/Components/Fintech/RiskGauge';
import InsightsPanel from '@/Components/Fintech/InsightsPanel';

export default function AdminDashboard({ stats }) {
    return (
        <AdminLayout>
            <Head title="Dashboard — Aurelia" />

            <div className="space-y-6 p-4 lg:p-6 max-w-[1600px] mx-auto">
                <PortfolioCard stats={stats} />
                <WatchlistBar items={stats.watchlist} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <AllocationGrid data={stats.allocation} />
                    </div>
                    <RiskGauge score={stats.riskScore} change={stats.riskChange} />
                </div>
                <InsightsPanel articles={stats.insights} />
            </div>
        </AdminLayout>
    );
}
