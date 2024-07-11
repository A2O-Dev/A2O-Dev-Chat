<?php

namespace App\Services;

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChatService
{
  public function verifyUser(string $email): Room
  {
    $currentUser = Auth::user();

    Log::debug('Verifying email', [
      'email' => $email,
      'user_id' => $currentUser->id,
      'request_ip' => request()->ip()
    ]);

    $otherUser = User::whereEmail($email)->firstOrFail();

    $room = Room::where('is_direct_message', true)
      ->whereHas('users', function ($query) use ($currentUser) {
        $query->where('user_id', $currentUser->id);
      })->whereHas('users', function ($query) use ($otherUser) {
        $query->where('user_id', $otherUser->id);
      })->first();

    if (!$room) {
      $room = Room::create(['name' => 'direct', 'is_direct_message' => true]);
      $room->users()->attach([$currentUser->id, $otherUser->id]);
      Log::debug('Room created', [
        'room' => $room,
        'user_id' => $currentUser->id,
        'request_ip' => request()->ip()
      ]);
    }
    return $room;
  }

  public function getUserRooms($user)
    {
        return $user->rooms()->with([
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
    }
}
