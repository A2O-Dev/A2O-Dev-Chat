<?php
//use Illuminate\Support\Facades\Broadcast;
//use App\Broadcasting\ChatChannel;
//
//Broadcast::channel('chat', ChatChannel::class);
use Illuminate\Support\Facades\Broadcast;
Broadcast::channel('chat', function ($user) {
    return true;
});
