<?php

namespace Tests\Unit;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Mockery;

class MessageControllerTest extends TestCase
{
  use RefreshDatabase;

  public function test_get_messages_success()
  {

    // Arrange
    Room::factory()->count(3)->create();
    User::factory()->count(3)->create();
    Message::factory()->count(3)->create();

    $user = User::first();

    // Act
    $this->actingAs($user);
    $response = $this->getJson('/messages');

    // Assert
    $response->assertStatus(200);
    $response->assertJsonCount(3);
  }

  public function test_send_message_success()
  {
    // Arrange
    Event::fake();

    $room = Room::factory()->create();
    $user = User::factory()->create();

    $data = [
      'message' => 'Hello, world!',
      'room_id' => $room->id,
      'user_id' => $user->id,
    ];

    // Act
    $this->actingAs($user);
    $response = $this->postJson('/message', $data);

    // Assert
    $response->assertStatus(200);
    $response->assertJson(['status' => 'Message Sent!']);

    Event::assertDispatched(MessageSent::class);
  }

  public function test_send_message_validation_failure()
  {
    // Arrange
    $data = [
      'message' => '',
      'room_id' => 999,
      'user_id' => 999,
    ];
    $user = User::factory()->create();

    // Act
    $this->actingAs($user);
    $response = $this->postJson('/message', $data);

    // Assert
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['message', 'room_id', 'user_id']);
  }
}
