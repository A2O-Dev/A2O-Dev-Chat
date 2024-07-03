<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/dashboard/{room?}', function (\App\Models\Room $room = null) {
    $user = Auth::user();
    $rooms = $user->rooms;

    $data = [
        'rooms' => $rooms,
        'room'  => $room->load('messages') ?? [],
        'messages' => $room->messages ?? []
    ];

    return Inertia::render('Dashboard', $data);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/test', function (Request $request, App\Models\Room $room) {
    return back()->withErrors(['error' => 'message has not been sent']);
    return redirect()->route('dashboard', ['room' => $room->id]);
    return Inertia::render('Dashboard', [
        'RoomList' => [],
        'ChatMessages' => []
    ]);
    //return response()->json(['message' => 'Datos recibidos correctamente']);

});
require __DIR__ . '/auth.php';
