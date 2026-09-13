<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    /**
     * Reviews may be submitted without an account.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'company' => [
                'nullable',
                'string',
                'max:255',
            ],

            'role' => [
                'nullable',
                'string',
                'max:255',
            ],

            'rating' => [
                'required',
                'integer',
                'between:1,5',
            ],

            'review' => [
                'required',
                'string',
                'min:10',
                'max:3000',
            ],

            'permission_to_publish' => [
                'required',
                'boolean',
            ],
        ];
    }

    /**
     * Custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' =>
                'Please provide your name.',

            'email.required' =>
                'Please provide your email address.',

            'email.email' =>
                'Please provide a valid email address.',

            'rating.required' =>
                'Please select a rating.',

            'rating.between' =>
                'The rating must be between 1 and 5.',

            'review.required' =>
                'Please write your review.',

            'review.min' =>
                'Please provide a little more detail in your review.',

            'permission_to_publish.required' =>
                'Please choose whether your review may be displayed publicly.',
        ];
    }
}