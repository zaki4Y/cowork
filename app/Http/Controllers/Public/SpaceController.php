<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Space;
use App\Services\BookingService;
use Inertia\Inertia;

class SpaceController extends Controller
{
    public function index()
    {
        $spaces = Space::with('amenities')
            ->where('is_available', true)
            ->when(request('type'), fn($q, $type) => $q->where('type', $type))
            ->when(request('capacity'), fn($q, $cap) => $q->where('capacity', '>=', $cap))
            ->latest()
            ->paginate(6);

        return Inertia::render('Public/Spaces', ['spaces' => $spaces]);
    }

    public function show(Space $space, BookingService $bookingService)
    {
        $space->load('amenities');
        $unavailableDates = $bookingService->getUnavailableDates($space);

        return Inertia::render('Public/SpaceDetail', [
            'space' => $space,
            'unavailableDates' => $unavailableDates,
        ]);
    }
}
