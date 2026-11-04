<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\ContactInquiry;
use App\Models\Space;
use App\Models\User;
use App\Enums\SpaceType;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();

        $confirmedBookings = Booking::where('status', 'confirmed');

        $monthlyRevenueChart = collect(range(11, 0))->map(function ($i) use ($now) {
            $month = $now->copy()->subMonths($i);
            $revenue = Booking::where('status', 'confirmed')
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('total_price');
            return [
                'month' => $month->format('M'),
                'revenue' => (float) $revenue,
            ];
        });

        $currentMonthRevenue = $monthlyRevenueChart->last()['revenue'];
        $prevMonthRevenue = $monthlyRevenueChart->offsetGet($monthlyRevenueChart->count() - 2)['revenue'];
        $portfolioGrowth = $prevMonthRevenue > 0
            ? round(($currentMonthRevenue - $prevMonthRevenue) / $prevMonthRevenue * 100, 1)
            : 0;

        $totalPortfolioValue = (float) Booking::where('status', 'confirmed')->sum('total_price');

        $typeLabels = [
            SpaceType::HotDesk->value => ['label' => 'Stocks', 'color' => '#22C55E'],
            SpaceType::PrivateOffice->value => ['label' => 'Bonds', 'color' => '#6366F1'],
            SpaceType::MeetingRoom->value => ['label' => 'ETFs', 'color' => '#FB923C'],
            SpaceType::VirtualOffice->value => ['label' => 'Crypto', 'color' => '#A855F7'],
        ];

        $spaceTypeTotals = [];
        foreach ($typeLabels as $type => $meta) {
            $spaceIds = Space::where('type', $type)->pluck('id');
            $total = (float) Booking::whereIn('space_id', $spaceIds)
                ->where('status', 'confirmed')
                ->sum('total_price');
            $spaceTypeTotals[$type] = $total;
        }

        $totalAllRevenue = array_sum($spaceTypeTotals) ?: 1;

        $assetCards = [];
        $allocation = [];
        foreach ($typeLabels as $type => $meta) {
            $value = $spaceTypeTotals[$type];
            $percentage = round(($value / $totalAllRevenue) * 100, 1);
            $assetCards[] = [
                'label' => $meta['label'],
                'value' => $value,
                'percentage' => $percentage,
                'color' => $meta['color'],
            ];
            $allocation[] = [
                'label' => $meta['label'],
                'percentage' => $percentage,
                'value' => $value,
                'color' => $meta['color'],
            ];
        }

        $topSpaces = Space::withCount(['bookings' => function ($q) {
            $q->where('status', 'confirmed');
        }])->orderByDesc('bookings_count')->take(5)->get();

        $watchlist = $topSpaces->map(function ($space) use ($topSpaces) {
            $trend = $topSpaces->search(function ($s) use ($space) { return $s->id === $space->id; }) % 2 === 0 ? 'up' : 'down';
            return [
                'name' => $space->name,
                'initials' => collect(explode(' ', $space->name))->map(fn($w) => substr($w, 0, 1))->take(2)->join(''),
                'price' => (float) $space->price_per_day,
                'trend' => $trend,
                'change' => $trend === 'up'
                    ? '+' . number_format(rand(10, 99) / 10, 1) . '%'
                    : '-' . number_format(rand(10, 99) / 10, 1) . '%',
            ];
        });

        $totalCapacity = Space::sum('capacity') ?: 1;
        $bookedDays = Booking::where('status', 'confirmed')
            ->where(function ($q) use ($startOfMonth, $endOfMonth) {
                $q->whereBetween('start_date', [$startOfMonth, $endOfMonth])
                  ->orWhereBetween('end_date', [$startOfMonth, $endOfMonth]);
            })->count();

        $occupancyRate = min(100, round(($bookedDays / ($totalCapacity * $now->daysInMonth)) * 200, 0));
        $riskScore = max(0, $occupancyRate);

        $riskChange = $riskScore > 50 ? '+4%' : '+2%';

        $insights = BlogPost::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($post) {
                $authorName = $post->author?->name ?? 'Staff';
                return [
                    'title' => $post->title,
                    'excerpt' => $post->excerpt ?? substr(strip_tags($post->content ?? ''), 0, 120) . '...',
                    'date' => $post->published_at?->diffForHumans() ?? 'Recent',
                    'author' => $authorName,
                    'author_initials' => collect(explode(' ', $authorName))->map(fn($w) => substr($w, 0, 1))->take(2)->join(''),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPortfolioValue' => $totalPortfolioValue,
                'portfolioGrowth' => $portfolioGrowth,
                'monthlyRevenueChart' => $monthlyRevenueChart,
                'assetCards' => $assetCards,
                'watchlist' => $watchlist,
                'allocation' => $allocation,
                'riskScore' => $riskScore,
                'riskChange' => $riskChange,
                'insights' => $insights,
            ],
        ]);
    }
}
