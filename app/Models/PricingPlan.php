<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PricingPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'price',
        'features', 'is_popular', 'billing_cycle',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_popular' => 'boolean',
            'price' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (PricingPlan $plan) {
            if (empty($plan->slug)) {
                $plan->slug = Str::slug($plan->name);
            }
        });
    }
}
