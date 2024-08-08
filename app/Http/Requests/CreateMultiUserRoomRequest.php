<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMultiUserRoomRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[][]
     */
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'users' => ['array'],
            'users.*' => ['integer'],
        ];
    }
}
