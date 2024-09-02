<?php

namespace App\Services;

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChatService
{
    /**
     * Verify the user's email and return the corresponding chat room.
     *
     * @param string
     * @return Room
     */
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

    /**
     * Get the rooms associated with the given user.
     *
     * @param User $user
     * @return Collection
     */
    public function getUserRooms($user)
    {
        $rooms = $user->rooms()->whereHas('messages')->with([
            'messages' => function ($query) {
                $query->latest()->take(1);
            },
            'users'
        ])->get();
        return $this->changeRoomName($rooms, $user);
    }

    /**
     * @param $query
     * @return array
     */
    public function searchByMessages($query)
    {
        $messages = Room::whereHas('messages', function ($q) use ($query) {
            $q->where('message', 'like', '%' . $query . '%');
        })
            ->whereHas('messages')
            ->with(['messages' => function ($q) use ($query) {
                $q->where('message', 'like', '%' . $query . '%')
                    ->with('user', 'room')
                    ->limit(1);
            }])
            ->get()
            ->unique('id');

        return $messages->isEmpty() ? [] : $messages;
    }

    /**
     * @param $query
     * @param User $user
     * @return array
     */
    public function searchByUser($query,User $user)
    {
        $rooms = Room::where('is_direct_message', 1)
            ->whereHas('users', function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%');
            })
            ->whereHas('messages')
            ->with(['messages' => function ($q) {
                $q->latest()->take(1)->with('user', 'room');
            }])
            ->get();

        return $this->changeRoomName($rooms, $user);
    }

    /**
     * @param User $user
     * @param $query
     * @return Collection
     */
    public function handleSearch(User $user, $query)
    {
        if ($query) {
            $searchedMessages = collect($this->searchByMessages($query));
            $searchedUsers = collect($this->searchByUser($query, $user));
            return $searchedMessages->merge($searchedUsers)->unique('id');
        }

        return $this->getUserRooms($user);
    }

    /**
     * @param Room|null $room
     * @return \Illuminate\Database\Eloquent\Collection|Collection
     */
    public function getRoomMessages(Room $room = null)
    {
        if ($room) {
            return $room->messages()->with('user')->get();
        }

        return collect([]);
    }

    /**
     * @param $rooms
     * @param User $user
     * @return mixed
     */
    private function changeRoomName($rooms, User $user)
    {
        return $rooms->map(function ($room) use ($user) {
            if ($room->is_direct_message) {
                $otherUser = $room->users->firstWhere('id', '!=', $user->id);
                if ($otherUser) {
                    $room->name = $otherUser->name;
                }
            }
            return $room;
        })
            ->unique('id')
            ->values();
    }
}
