<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Space;
use App\Models\BlogPost;
use App\Models\PricingPlan;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Home', [
            'featuredSpaces' => Space::with('amenities')
                ->where('is_available', true)
                ->latest()->take(6)->get(),
            'latestPosts' => BlogPost::with('author')
                ->where('is_published', true)
                ->latest('published_at')->take(3)->get(),
            'plans' => PricingPlan::all(),
            'stats' => [
                'spaces' => Space::where('is_available', true)->count(),
                'members' => \App\Models\User::where('role', 'member')->count(),
                'cities' => 3,
                'years' => now()->year - 2020,
            ],
        ]);
    }
}
