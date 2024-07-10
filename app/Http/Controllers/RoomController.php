<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\SendMessageRequest;
use App\Http\Requests\VerifyUserRequest;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Clue\Redis\Protocol\Model\Request;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
  public function verifyUser(VerifyUserRequest  $request)
  {
    $currentUser = Auth::user();
    DB::beginTransaction();

    try {
      Log::debug('Verifying email', [
        'request' => $request->all(),
        'user_id' => $currentUser->id,
        'request_ip' => request()->ip()
      ]);
      $email = $request->input('email');

      try {
        $otherUser = User::whereEmail($email)->firstOrFail();
      } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        Log::debug('User not found', [
          'request' => $request->all(),
          'user_id' => $currentUser->id,
          'request_ip' => request()->ip()
        ]);
        return back()->withErrors(['error' => 'User not found.']);
      }

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
      return redirect()->route('dashboard', ['room' => $room->id]);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error('Error validating user', [
        'exception' => $e->getMessage(),
        'user_id' => auth()->user()->id ?? 'guest',
        'request_ip' => request()->ip()
      ]);
      return back()->withErrors(['error' => 'message has not been sent']);
    }
  }
}
