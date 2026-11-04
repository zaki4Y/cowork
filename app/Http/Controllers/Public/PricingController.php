<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Pricing', [
            'plans' => PricingPlan::all(),
        ]);
    }
}
