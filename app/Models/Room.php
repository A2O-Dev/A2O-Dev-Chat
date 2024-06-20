<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * @return HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * The users that belong to the room.
     *
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'room_user');
    }
}
