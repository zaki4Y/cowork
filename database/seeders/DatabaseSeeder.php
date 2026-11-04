<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\PricingPlan;
use App\Models\Space;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@cowork.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Member',
            'email' => 'member@cowork.com',
            'password' => bcrypt('password'),
            'role' => 'member',
        ]);

        User::factory(8)->create(['role' => 'member']);

        $amenityData = [
            ['name' => 'Wi-Fi', 'icon' => 'wifi'],
            ['name' => 'Air Conditioning', 'icon' => 'snowflake'],
            ['name' => 'Coffee Machine', 'icon' => 'coffee'],
            ['name' => 'Parking', 'icon' => 'car'],
            ['name' => 'Meeting Room', 'icon' => 'users'],
            ['name' => 'Printer', 'icon' => 'printer'],
            ['name' => 'Kitchen', 'icon' => 'utensils'],
            ['name' => 'Security', 'icon' => 'shield'],
            ['name' => '24/7 Access', 'icon' => 'clock'],
            ['name' => 'Lounge Area', 'icon' => 'couch'],
        ];
        foreach ($amenityData as $data) {
            Amenity::create($data);
        }

        Space::factory(12)->create()->each(function ($space) {
            $space->amenities()->attach(
                Amenity::inRandomOrder()->take(rand(3, 6))->pluck('id')->toArray()
            );
        });

        Booking::factory(20)->create([
            'user_id' => fn() => User::where('role', 'member')->inRandomOrder()->first()->id,
            'space_id' => fn() => Space::inRandomOrder()->first()->id,
        ]);

        BlogPost::factory(6)->create(['author_id' => 1]);

        PricingPlan::create([
            'name' => 'Hot Desk',
            'description' => 'Perfect for freelancers and remote workers.',
            'price' => 199,
            'features' => ['Access to hot desks', 'High-speed Wi-Fi', 'Coffee & tea', 'Community events', 'Business address'],
            'is_popular' => false,
            'billing_cycle' => 'monthly',
        ]);

        PricingPlan::create([
            'name' => 'Fixed Desk',
            'description' => 'Your own dedicated desk in a shared workspace.',
            'price' => 349,
            'features' => ['Dedicated desk', 'Lockable storage', 'High-speed Wi-Fi', 'Coffee & tea', 'Community events', 'Business address', 'Mail handling'],
            'is_popular' => true,
            'billing_cycle' => 'monthly',
        ]);

        PricingPlan::create([
            'name' => 'Private Office',
            'description' => 'Fully furnished private office for teams.',
            'price' => 899,
            'features' => ['Private office', 'Furnished', 'High-speed Wi-Fi', 'Meeting room credits', 'Coffee & tea', '24/7 Access', 'Business address', 'Mail handling', 'Support team'],
            'is_popular' => false,
            'billing_cycle' => 'monthly',
        ]);
    }
}
