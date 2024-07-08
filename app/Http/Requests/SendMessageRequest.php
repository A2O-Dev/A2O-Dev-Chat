<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'max:255'],
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
