<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $start = fake()->dateTimeBetween('now', '+1 month');
        $end = (clone $start)->modify('+' . fake()->numberBetween(1, 8) . ' hours');
        return [
            'start_date' => $start,
            'end_date' => $end,
            'total_price' => fake()->randomFloat(2, 20, 500),
            'status' => fake()->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
            'notes' => fake()->optional(0.3)->randomElement([
                'Need an extra monitor and HDMI cable.',
                'Arriving late, around 10:30 AM.',
                'Will bring two guests for a brief meeting.',
                'Prefer a quiet corner away from the entrance.',
                'Require wheelchair-accessible seating.',
                'Please prepare the whiteboard for a workshop.',
                null,
            ]),
        ];
    }
}
