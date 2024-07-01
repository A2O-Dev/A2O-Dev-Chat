<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        Log::debug("entra al controller");
        $message = Message::create([
            'message' => $request->input('message'),
            'room_id' => $request->input('room_id'),
            'user_id' => $request->input('user_id'),
        ]);
        event(new MessageSent($message));
        return response()->json(['status' => 'Message Sent!']);
    }
}
