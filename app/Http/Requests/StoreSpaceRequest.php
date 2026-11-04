<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSpaceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:hot_desk,private_office,meeting_room,virtual_office',
            'capacity' => 'required|integer|min:1',
            'price_per_hour' => 'nullable|numeric|min:0',
            'price_per_day' => 'nullable|numeric|min:0',
            'price_per_month' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|max:5120',
            'is_available' => 'boolean',
            'amenities' => 'nullable|array',
            'amenities.*' => 'exists:amenities,id',
        ];
    }
}
