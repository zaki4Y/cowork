<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Blog', [
            'posts' => BlogPost::with('author')
                ->where('is_published', true)
                ->latest('published_at')
                ->paginate(9),
        ]);
    }

    public function show(BlogPost $post)
    {
        if (!$post->is_published) {
            abort(404);
        }
        return Inertia::render('Public/BlogPost', [
            'post' => $post->load('author'),
            'recentPosts' => BlogPost::where('is_published', true)
                ->where('id', '!=', $post->id)
                ->latest('published_at')
                ->take(3)
                ->get(),
        ]);
    }
}
