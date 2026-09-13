<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequestRequest extends FormRequest
{
    /**
     * Determine whether the user is authorized
     * to make this request.
     */
    public function authorize(): bool
    {
        /*
         * This is a public portfolio form,
         * so visitors do not need to be authenticated.
         */
        return true;
    }

    /**
     * Validation rules for incoming project requests.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            /*
             * Project
             */
            'project_type' => [
                'required',
                'string',
                Rule::in([
                    'website',
                    'web-app',
                    'ecommerce',
                    'integration',
                ]),
            ],

            'project_name' => [
                'required',
                'string',
                'max:255',
            ],

            'project_description' => [
                'required',
                'string',
                'max:5000',
            ],

            /*
             * Requirements
             */
            'features' => [
                'nullable',
                'array',
            ],

            'features.*' => [
                'string',
                'max:100',
            ],

            'custom_feature' => [
                'nullable',
                'string',
                'max:255',
            ],

            /*
             * Scope
             */
            'pages' => [
                'nullable',
                'string',
                'max:100',
            ],

            'has_existing_website' => [
                'required',
                'boolean',
            ],

            'existing_website_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'budget' => [
                'nullable',
                'string',
                Rule::in([
                    'under-500',
                    '500-1000',
                    '1000-2500',
                    '2500-plus',
                    'not-sure',
                ]),
            ],

            'timeline' => [
                'nullable',
                'string',
                Rule::in([
                    'asap',
                    '2-4-weeks',
                    '1-2-months',
                    'flexible',
                ]),
            ],

            /*
             * Client
             */
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

            /*
             * Additional information
             */
            'additional_notes' => [
                'nullable',
                'string',
                'max:5000',
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
            'project_type.required' =>
                'Please select a project type.',

            'project_type.in' =>
                'The selected project type is invalid.',

            'project_name.required' =>
                'Please provide a project name.',

            'project_description.required' =>
                'Please describe your project.',

            'name.required' =>
                'Please provide your name.',

            'email.required' =>
                'Please provide your email address.',

            'email.email' =>
                'Please provide a valid email address.',

            'existing_website_url.url' =>
                'Please provide a valid website URL.',
        ];
    }
}