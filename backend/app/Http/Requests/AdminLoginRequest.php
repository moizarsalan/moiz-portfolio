<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' =>
                'Please enter your admin email address.',

            'email.email' =>
                'Please enter a valid email address.',

            'password.required' =>
                'Please enter your admin password.',
        ];
    }
}