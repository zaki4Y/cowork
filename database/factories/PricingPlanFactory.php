<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PricingPlanFactory extends Factory
{
    private static array $plans = [
        [
            'name' => 'Hot Desk',
            'description' => 'Perfect for freelancers and remote workers who need a flexible workspace.',
            'price' => 199,
            'is_popular' => false,
            'billing_cycle' => 'monthly',
        ],
        [
            'name' => 'Fixed Desk',
            'description' => 'Your own dedicated desk in a shared workspace environment.',
            'price' => 349,
            'is_popular' => true,
            'billing_cycle' => 'monthly',
        ],
        [
            'name' => 'Private Office',
            'description' => 'Fully furnished private office for teams who need privacy and space.',
            'price' => 899,
            'is_popular' => false,
            'billing_cycle' => 'monthly',
        ],
    ];

    public function definition(): array
    {
        $features = [
            'Hot Desk' => ['Access to hot desks', 'High-speed Wi-Fi', 'Coffee & tea', 'Community events', 'Business address'],
            'Fixed Desk' => ['Dedicated desk', 'Lockable storage', 'High-speed Wi-Fi', 'Coffee & tea', 'Community events', 'Business address', 'Mail handling'],
            'Private Office' => ['Private office', 'Furnished', 'High-speed Wi-Fi', 'Meeting room credits', 'Coffee & tea', '247 Access', 'Business address', 'Mail handling', 'Support team'],
        ];

        $plan = self::$plans[array_rand(self::$plans)];

        return $plan + ['features' => $features[$plan['name']]];
    }
}
