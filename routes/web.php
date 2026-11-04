<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');
Route::get('/spaces', [App\Http\Controllers\Public\SpaceController::class, 'index'])->name('spaces.index');
Route::get('/spaces/{space}', [App\Http\Controllers\Public\SpaceController::class, 'show'])->name('spaces.show');
Route::get('/pricing', [App\Http\Controllers\Public\PricingController::class, 'index'])->name('pricing');
Route::get('/about', [App\Http\Controllers\Public\AboutController::class, 'index'])->name('about');
Route::get('/blog', [App\Http\Controllers\Public\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [App\Http\Controllers\Public\BlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [App\Http\Controllers\Public\ContactController::class, 'index'])->name('contact');
Route::post('/contact', [App\Http\Controllers\Public\ContactController::class, 'store'])->name('contact.store');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard/Index'))->name('dashboard');
    Route::get('/my-bookings', [App\Http\Controllers\Public\BookingController::class, 'index'])->name('dashboard.bookings');
    Route::post('/bookings', [App\Http\Controllers\Public\BookingController::class, 'store'])->name('bookings.store');
    Route::delete('/bookings/{booking}', [App\Http\Controllers\Public\BookingController::class, 'destroy'])->name('bookings.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('spaces', App\Http\Controllers\Admin\SpaceController::class)->except('show');
    Route::resource('bookings', App\Http\Controllers\Admin\BookingController::class)->only(['index', 'destroy']);
    Route::put('bookings/{booking}', [App\Http\Controllers\Admin\BookingController::class, 'update'])->name('bookings.update');
    Route::resource('users', App\Http\Controllers\Admin\UserController::class)->only(['index', 'destroy']);
    Route::resource('blog', App\Http\Controllers\Admin\BlogController::class)->except('show');
    Route::resource('contacts', App\Http\Controllers\Admin\ContactController::class)->only(['index', 'show', 'destroy']);
});

require __DIR__ . "/auth.php";

Route::fallback(function () {
    return Inertia::render('Public/NotFound');
});
