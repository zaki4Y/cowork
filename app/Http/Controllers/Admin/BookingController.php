<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with(['user', 'space'])
                ->latest()->paginate(10),
        ]);
    }

    public function update(Booking $booking)
    {
        $booking->update(request()->validate([
            'status' => 'required|string|in:pending,confirmed,cancelled,completed',
        ]));
        return redirect()->route('admin.bookings.index')->with('success', 'Booking updated.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('admin.bookings.index')->with('success', 'Booking deleted.');
    }
}
