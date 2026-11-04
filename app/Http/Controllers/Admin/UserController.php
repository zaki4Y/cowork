<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::latest()->paginate(10),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->isAdmin()) {
            return back()->with('error', 'Cannot delete admin users.');
        }
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted.');
    }
}
