<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\SendMessageRequest;
use App\Models\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /**
     * Send a message.
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
            return back()->withErrors(['error' => 'message has not been sent']);
        }
    }
}
