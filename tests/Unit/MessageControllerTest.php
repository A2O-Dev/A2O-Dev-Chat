<?php

namespace Tests\Unit;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\Event;

class MessageControllerTest extends TestCase
{
  use RefreshDatabase;

  public function test_get_messages_success()
  {

    // Given
    Room::factory()->count(3)->create();
    User::factory()->count(3)->create();
    Message::factory()->count(3)->create();

    $user = User::first();

    // When
    $this->actingAs($user);
    $response = $this->getJson('/messages');

    // Then
    $response->assertStatus(200);
    $response->assertJsonCount(3);
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
}
