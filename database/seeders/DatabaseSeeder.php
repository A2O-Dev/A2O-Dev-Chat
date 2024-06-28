<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\Room;
use App\Models\RoomUser;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $rooms = Room::factory(10)->create();

        $users = User::factory(10)->create();

        foreach ($rooms as $room) {
            $roomUsers = $users->random(rand(1, 5));
            foreach ($roomUsers as $user) {
                RoomUser::factory()->create([
                    'room_id' => $room->id,
                    'user_id' => $user->id,
                ]);
            }
        }

        foreach ($rooms as $room) {
            $roomUsers = $room->users;
            foreach ($roomUsers as $user) {
                Message::factory(rand(1, 5))->create([
                    'room_id' => $room->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
