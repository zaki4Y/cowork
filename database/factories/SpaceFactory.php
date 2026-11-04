<?php

namespace Database\Factories;

use App\Enums\SpaceType;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpaceFactory extends Factory
{
    public function definition(): array
    {
        $types = SpaceType::cases();
        $type = $types[array_rand($types)]->value;

        static $index = 0;
        $names = [
            'The Corner Desk', 'Skyline Office', 'The Hive',
            'Boardroom A', 'Creative Loft', 'The Nook',
            'Urban Workbench', 'The Greenhouse', 'Focus Cabin',
            'The Commons', 'Penthouse Suite', 'The Workshop',
        ];
        $descriptions = [
            'A bright corner workspace with natural light and ergonomic seating, perfect for focused individual work.',
            'Modern private office with floor-to-ceiling windows offering panoramic city views. Includes sit-stand desks and a dedicated meeting area.',
            'A vibrant open-plan space designed for collaboration. Features whiteboard walls, modular furniture, and a casual lounge area.',
            'Professional boardroom equipped with a 65-inch 4K display, video conferencing system, and seating for up to 12 people.',
            'An inspirational loft-style space with exposed brick walls, high ceilings, and curated art. Ideal for creative teams and photoshoots.',
            'A quiet, cozy workspace tucked away from the main floor. Perfect for deep work and confidential calls.',
            'Sleek modern workstations in a prime location. Includes monitor arms, cable management, and adjustable task lighting.',
            'A sun-drenched corner filled with plants and natural materials. Biophilic design at its best for wellbeing and creativity.',
            'A soundproofed single-person cabin with premium acoustics, blackout blinds, and a comfortable ergonomic chair.',
            'A large communal table setup with bench seating, ideal for team sprints, workshops, and networking events.',
            'Our most exclusive offering — a private penthouse with a terrace, kitchenette, and stunning skyline views.',
            'A hands-on makerspace with large tables, tool storage, and a prototyping area. Great for product teams.',
        ];

        $i = $index % count($names);
        $index++;

        return [
            'name' => $names[$i],
            'description' => $descriptions[$i],
            'type' => $type,
            'capacity' => fake()->numberBetween(1, 20),
            'price_per_hour' => fake()->randomFloat(2, 5, 50),
            'price_per_day' => fake()->randomFloat(2, 30, 300),
            'price_per_month' => fake()->randomFloat(2, 200, 2000),
            'images' => ['/images/space-' . fake()->numberBetween(1, 5) . '.jpg'],
            'is_available' => true,
        ];
    }
}
