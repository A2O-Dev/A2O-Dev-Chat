<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/search', function (Request $request) {
    $query = $request->input('query');

    $messages = Room::whereHas('messages', function ($q) use ($query) {
        $q->where('message', 'like', '%' . $query . '%');
    })->with(['messages' => function ($q) use ($query) {
        $q->where('message', 'like', '%' . $query . '%')->with('user')->get();
    }, 'messages.user']) // Traer usuarios asociados a los mensajes
    ->get();

    $users = Room::whereHas('users', function($q) use ($query) {
        $q->where('name', 'like', '%' . $query . '%');
    })->with(['messages' => function ($q) use ($query) {
        $q->latest()->take(1)->with('user')->get();
    }])
    ->get();

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

Route::get('/dashboard/{room?}', [ChatController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/message', [ChatController::class, 'sendMessage'])->middleware(['auth', 'verified']);
Route::post('/verify_user', [ChatController::class, 'verifyUser'])->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
