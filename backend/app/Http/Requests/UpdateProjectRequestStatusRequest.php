<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequestStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => [
                'required',
                'string',
                Rule::in([
                    'pending',
                    'contacted',
                    'in-progress',
                    'completed',
                    'rejected',
                ]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' =>
                'Please provide a project request status.',

            'status.in' =>
                'The selected project request status is invalid.',
        ];
    }
}