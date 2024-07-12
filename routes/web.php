<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Models\Room;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/search', function (Request $request) {
    $query = $request->input('query');

    $messages = Room::whereHas('messages', function ($q) use ($query) {
        $q->where('message', 'like', '%' . $query . '%');
    })->with(['messages' => function ($q) use ($query) {
        $q->where('message', 'like', '%' . $query . '%');
    }])->get();

    $users = Room::whereHas('users', function($q) use ($query) {
        $q->where('name', 'like', '%' . $query . '%');
    })->with(['messages' => function ($q) use ($query) {
        $q->latest()->take(1);
    }])->get();

    $results = $messages->merge($users)->unique('id');
    return response()->json(['query' => $results]);
});

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
    $rooms = $user->rooms()->with(['messages' => function ($query) {
        $query->latest()->take(1);
    }])->get();

    $data = [
        'rooms' => $rooms,
        'messages' => isset($room) ? $room->messages()->with('user')->get() : [],
        'room' => $room ?? []
    ];
    return Inertia::render('Dashboard', $data);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/message', [MessageController::class, 'sendMessage'])->middleware(['auth', 'verified']);


require __DIR__ . '/auth.php';
