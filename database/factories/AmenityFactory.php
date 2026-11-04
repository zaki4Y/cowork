<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AmenityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'icon' => fake()->word(),
        ];
    }
}
