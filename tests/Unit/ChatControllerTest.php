<?php

namespace Tests\Unit;

use App\Events\MessageSent;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;

class ChatControllerTest extends TestCase
{
  use RefreshDatabase;

  public function it_verifies_a_user_and_redirects_to_dashboard()
  {
    // Given
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    Auth::login($user);

    $room = new Room();
    $room->name = 'direct';
    $room->is_direct_message = true;
    $room->save();
    $room->users()->attach([$user->id, $otherUser->id]);

    // When
    $response = $this->post('/verify_user', ['email' => $otherUser->email]);

    // Then
    $response->assertRedirect(route('dashboard', ['room' => $room->id]));
  }

  public function it_shows_error_if_user_verification_fails()
  {
    // Given
    $user = User::factory()->create();
    Auth::login($user);

    // When
    $response = $this->post('/verify_user', ['email' => 'nonexistent@example.com']);

    // Then
    $response->assertSessionHasErrors('email');
    $response->assertRedirect(url()->previous());
  }

  public function test_send_message_success()
  {
    // Given
    Event::fake();

    $room = Room::factory()->create();
    $user = User::factory()->create();

    $data = [
      'message' => 'Hello, world!',
      'room_id' => $room->id,
      'user_id' => $user->id,
    ];

    // When
    $this->actingAs($user);
    $response = $this->postJson('/message', $data);

    // Then
    $response->assertStatus(302);
    $this->assertDatabaseHas('messages', $data);
    Event::assertDispatched(MessageSent::class);
  }

  public function test_send_message_validation_failure()
  {
    // Given
    $data = [
      'message' => '',
      'room_id' => 999,
      'user_id' => 999,
    ];
    $user = User::factory()->create();

    // When
    $this->actingAs($user);
    $response = $this->postJson('/message', $data);

    // Then
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['message', 'room_id', 'user_id']);
  }

  public function it_creates_a_new_room_with_many_users_and_redirects_to_dashboard()
  {
    // Given
    $user = User::factory()->create();
    $userOne = User::factory()->create();
    $userTwo = User::factory()->create();
    Auth::login($user);

    // When
    $response = $this->post('/create_multiuser_room', ['name' => 'room1', 'users' => [$userOne->id, $userTwo->id]]);
    // Then
    $response->assertRedirect(route('dashboard', ['room' => $response->room->id]));
  }

}
