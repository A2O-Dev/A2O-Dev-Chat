<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\SendMessageRequest;
use App\Http\Requests\VerifyUserRequest;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use App\Services\ChatService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{
  /**
   * The chat service instance.
   *
   * @var ChatService
   */
  protected $chatService;

  /**
   * ChatController constructor.
   *
   * @param ChatService $chatService
   */
  public function __construct(ChatService $chatService)
  {
    $this->chatService = $chatService;
  }

  /**
   * Display the chat dashboard.
   *
   * @param Room|null $room The room to display messages for.
   * @return \Inertia\Response
   */
  public function index(Room $room = null)
  {
    $user = Auth::user();
    $rooms = $this->chatService->getUserRooms($user);

    $data = [
      'users' => User::all(),
      'rooms' => $rooms,
      'messages' => $room ? $room->messages()->with('user')->get() : [],
      'room' => $room ?? []
    ];

    return Inertia::render('Dashboard', $data);
  }

  /**
   * Verify a user's email address and redirect to the corresponding chat room.
   *
   * @param VerifyUserRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function verifyUser(VerifyUserRequest $request)
  {
    try {
      $room = $this->chatService->verifyUser($request->input('email'));
      return redirect()->route('dashboard', ['room' => $room->id]);
    } catch (Exception $e) {
      Log::error('Error validating user', [
        'exception' => $e->getMessage(),
        'user_id' => auth()->user()->id ?? 'guest',
        'request_ip' => request()->ip()
      ]);
      return back()->withErrors(['email' => 'User not found']);
    }
  }

  /**
   * Send a message to a chat room.
   *
   * @param SendMessageRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function sendMessage(SendMessageRequest $request)
  {
    DB::beginTransaction();

    try {
      Log::debug('Sending message', [
        'request' => $request->all(),
        'user_id' => auth()->user()->id ?? 'guest',
        'request_ip' => request()->ip()
      ]);

      $message = Message::create($request->validated());

      event(new MessageSent($message));

      DB::commit();
      Log::info('Message sent successfully', [
        'message_id' => $message->id,
        'user_id' => auth()->user()->id,
        'request_ip' => request()->ip()
      ]);

      return redirect()->route('dashboard', ['room' => $request->room_id]);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error('Error sending message', [
        'exception' => $e->getMessage(),
        'user_id' => auth()->user()->id ?? 'guest',
        'request_ip' => request()->ip()
      ]);
      return back()->withErrors(['message' => 'Message has not been sent']);
    }
  }
}
