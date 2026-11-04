<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Space;
use App\Services\BookingService;
use Carbon\Carbon;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/MyBookings', [
            'bookings' => auth()->user()->bookings()
                ->with('space')
                ->latest()
                ->paginate(10),
        ]);
    }

    public function store(StoreBookingRequest $request, BookingService $bookingService)
    {
        $space = Space::findOrFail($request->space_id);
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        if (!$bookingService->checkAvailability($space, $startDate, $endDate)) {
            return back()->withErrors(['dates' => 'Selected dates are not available.']);
        }

        $price = $bookingService->calculatePrice($space, $startDate, $endDate);

        auth()->user()->bookings()->create([
            'space_id' => $space->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_price' => $price,
            'notes' => $request->notes,
        ]);

        return redirect()->route('dashboard.bookings')->with('success', 'Booking created!');
    }

    public function destroy($booking)
    {
        $booking = auth()->user()->bookings()->findOrFail($booking);
        if ($booking->status === \App\Enums\BookingStatus::Pending) {
            $booking->update(['status' => \App\Enums\BookingStatus::Cancelled]);
        }
        return back()->with('success', 'Booking cancelled.');
    }
}
