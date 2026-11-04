<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Models\BlogPost;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPost::with('author')->latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Form');
    }

    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        $data['author_id'] = auth()->id();
        if (!empty($data['is_published'])) {
            $data['published_at'] = now();
        }
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blog', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }
        BlogPost::create($data);
        return redirect()->route('admin.blog.index')->with('success', 'Post created.');
    }

    public function edit(BlogPost $post)
    {
        return Inertia::render('Admin/Blog/Form', ['post' => $post]);
    }

    public function update(StoreBlogPostRequest $request, BlogPost $post)
    {
        $data = $request->validated();
        if (!empty($data['is_published']) && !$post->published_at) {
            $data['published_at'] = now();
        }
        if ($request->hasFile('featured_image')) {
            if ($post->featured_image && str_starts_with($post->featured_image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $post->featured_image));
            }
            $path = $request->file('featured_image')->store('blog', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }
        $post->update($data);
        return redirect()->route('admin.blog.index')->with('success', 'Post updated.');
    }

    public function destroy(BlogPost $post)
    {
        if ($post->featured_image && str_starts_with($post->featured_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $post->featured_image));
        }
        $post->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Post deleted.');
    }
}
