<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/test-socket', function () {
    //Broadcast::event('test', ['message' => 'This message is an test message']);
    event(new \App\Events\TestEvent());
    return response()->json(['message' => 'Event sent']);
});
Route::get('/fire', function () {
    event(new \App\Events\TestEvent());
    //Broadcast::event('test', ['message' => 'This message is an test message']);
    return 'ok';
});
Route::get('/test', function () {
    return Inertia::render('TestSocket');
})->name('test');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
