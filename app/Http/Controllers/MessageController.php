<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Get all messages.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessages()
    {
        try {
            $messages = Message::all();
            Log::info('Messages retrieved successfully', [
                'count' => $messages->count(),
                'user_id' => auth()->user()->id,
                'request_ip' => request()->ip()
            ]);
            return response()->json($messages, 200);
        } catch (Exception $e) {
            Log::error('Error retrieving messages', [
                'exception' => $e->getMessage(),
                'user_id' => auth()->user()->id ?? 'guest',
                'request_ip' => request()->ip()
            ]);
            return response()->json(['error' => 'Failed to retrieve messages'], 500);
        }
    }

    /**
     * Send a message.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:255',
            'room_id' => 'required|integer|exists:rooms,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            Log::warning('Message send validation failed', [
                'errors' => $validator->errors(),
                'user_id' => auth()->user()->id ?? 'guest',
                'request_ip' => request()->ip()
            ]);
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            Log::debug('Sending message', [
                'request' => $request->all(),
                'user_id' => auth()->user()->id ?? 'guest',
                'request_ip' => request()->ip()
            ]);
            $message = Message::create([
                'message' => $request->input('message'),
                'room_id' => $request->input('room_id'),
                'user_id' => $request->input('user_id'),
            ]);

            event(new MessageSent($message));

            DB::commit();
            Log::info('Message sent successfully', [
                'message_id' => $message->id,
                'user_id' => auth()->user()->id ?? 'guest',
                'request_ip' => request()->ip()
            ]);
            return response()->json(['status' => 'Message Sent!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error sending message', [
                'exception' => $e->getMessage(),
                'user_id' => auth()->user()->id ?? 'guest',
                'request_ip' => request()->ip()
            ]);
            return response()->json(['error' => 'Failed to send message'], 500);
        }
    }
}
