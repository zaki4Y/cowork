<?php

namespace App\Models;

use App\Enums\SpaceType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'type', 'capacity',
        'price_per_hour', 'price_per_day', 'price_per_month',
        'images', 'is_available',
    ];

    protected function casts(): array
    {
        return [
            'type' => SpaceType::class,
            'images' => 'array',
            'is_available' => 'boolean',
            'price_per_hour' => 'decimal:2',
            'price_per_day' => 'decimal:2',
            'price_per_month' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Space $space) {
            if (empty($space->slug)) {
                $space->slug = Str::slug($space->name);
            }
        });
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'space_amenity');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
