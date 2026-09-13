<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ModerateReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => [
                'required',
                'string',
                Rule::in([
                    'approve',
                    'reject',
                    'unpublish',
                    'reset',
                ]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'action.required' =>
                'Please provide a moderation action.',

            'action.in' =>
                'The selected moderation action is invalid.',
        ];
    }
}