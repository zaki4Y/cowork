<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Space;
use Carbon\Carbon;

class BookingService
{
    public function checkAvailability(Space $space, Carbon $startDate, Carbon $endDate): bool
    {
        return !Booking::where('space_id', $space->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                    ->orWhereBetween('end_date', [$startDate, $endDate])
                    ->orWhere(function ($q) use ($startDate, $endDate) {
                        $q->where('start_date', '<=', $startDate)
                          ->where('end_date', '>=', $endDate);
                    });
            })
            ->exists();
    }

    public function calculatePrice(Space $space, Carbon $startDate, Carbon $endDate): float
    {
        $hours = $startDate->diffInHours($endDate);
        $days = $startDate->diffInDays($endDate);

        if ($days >= 30 && $space->price_per_month) {
            return $space->price_per_month * ceil($days / 30);
        }
        if ($days >= 1 && $space->price_per_day) {
            $remaining = $hours - ($days * 24);
            $dayPrice = $space->price_per_day * $days;
            $hourPrice = $space->price_per_hour ? $space->price_per_hour * $remaining : 0;
            return $dayPrice + $hourPrice;
        }
        if ($space->price_per_hour) {
            return $space->price_per_hour * max(1, $hours);
        }

        return 0;
    }

    public function getUnavailableDates(Space $space): array
    {
        return Booking::where('space_id', $space->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get()
            ->flatMap(function ($booking) {
                $dates = [];
                $current = $booking->start_date->copy();
                while ($current->lte($booking->end_date)) {
                    $dates[] = $current->format('Y-m-d');
                    $current->addDay();
                }
                return $dates;
            })
            ->unique()
            ->values()
            ->toArray();
    }
}
