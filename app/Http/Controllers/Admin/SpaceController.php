<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSpaceRequest;
use App\Models\Amenity;
use App\Models\Space;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpaceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Spaces/Index', [
            'spaces' => Space::with('amenities')->latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Spaces/Form', [
            'amenities' => Amenity::all(),
        ]);
    }

    public function store(StoreSpaceRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = '/storage/' . $image->store('spaces', 'public');
            }
            $data['images'] = $paths;
        }
        $space = Space::create($data);
        if ($request->has('amenities')) {
            $space->amenities()->sync($request->amenities);
        }
        return redirect()->route('admin.spaces.index')->with('success', 'Space created.');
    }

    public function edit(Space $space)
    {
        return Inertia::render('Admin/Spaces/Form', [
            'space' => $space->load('amenities'),
            'amenities' => Amenity::all(),
        ]);
    }

    public function update(StoreSpaceRequest $request, Space $space)
    {
        $data = $request->validated();
        if ($request->hasFile('images')) {
            foreach ((array) $space->images as $old) {
                if ($old && str_starts_with($old, '/storage/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $old));
                }
            }
            $paths = [];
            foreach ($request->file('images') as $image) {
                $paths[] = '/storage/' . $image->store('spaces', 'public');
            }
            $data['images'] = $paths;
        }
        $space->update($data);
        if ($request->has('amenities')) {
            $space->amenities()->sync($request->amenities);
        }
        return redirect()->route('admin.spaces.index')->with('success', 'Space updated.');
    }

    public function destroy(Space $space)
    {
        foreach ((array) $space->images as $old) {
            if ($old && str_starts_with($old, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $old));
            }
        }
        $space->delete();
        return redirect()->route('admin.spaces.index')->with('success', 'Space deleted.');
    }
}
