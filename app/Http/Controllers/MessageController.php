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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            Log::debug("Entra al controlador sendMessage");

            $message = Message::create([
                'message' => $request->input('message'),
                'room_id' => $request->input('room_id'),
                'user_id' => $request->input('user_id'),
            ]);

            event(new MessageSent($message));

            DB::commit();

            return response()->json(['status' => 'Message Sent!'], 200);
        } catch (Exception $e) {

            DB::rollBack();

            Log::error("Error when sending the message: {$e->getMessage()}", [
                'exception' => $e,
            ]);

            return response()->json(['error' => 'Failed to send message'], 500);
        }
    }
}
