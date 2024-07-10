<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\Room;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard/{room?}', function (Room $room = null) {
    $user = Auth::user();
    $rooms = $user->rooms()->with([
        'messages' => function ($query) {
            $query->latest()->take(1);
        },
        'users'
    ])->get()->map(function ($room) use ($user) {
        if ($room->is_direct_message) {
            $otherUser = $room->users->firstWhere('id', '!=', $user->id);
            if ($otherUser) {
                $room->name = $otherUser->name;
            }
        }
        return $room;
    });

    $data = [
        'rooms' => $rooms,
        'messages' => isset($room) ? $room->messages()->with('user')->get() : [],
        'room' => $room ? $room->load('messages') : []
    ];
    return Inertia::render('Dashboard', $data);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/message', [MessageController::class, 'sendMessage'])->middleware(['auth', 'verified']);
Route::post('/verify_user', [RoomController::class, 'verifyUser'])->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
