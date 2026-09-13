<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /*
    |--------------------------------------------------------------------------
    | NORMALIZE PUBLIC INPUT
    |--------------------------------------------------------------------------
    */

    protected function prepareForValidation(): void
    {
        $name = $this->input('name');

        $email = $this->input('email');

        $subject = $this->input('subject');

        $message = $this->input('message');

        $honeypot = $this->input(
            'company_website'
        );

        if (is_string($name)) {
            $name = preg_replace(
                '/\s+/u',
                ' ',
                trim($name)
            );
        }

        if (is_string($email)) {
            $email = mb_strtolower(
                trim($email)
            );
        }

        if (is_string($subject)) {
            $subject = trim(
                $subject
            );

            if ($subject === '') {
                $subject = null;
            }
        }

        if (is_string($message)) {
            $message = str_replace(
                "\r\n",
                "\n",
                $message
            );

            $message = str_replace(
                "\0",
                '',
                $message
            );

            $message = trim(
                $message
            );
        }

        if (is_string($honeypot)) {
            $honeypot = trim(
                $honeypot
            );
        }

        $this->merge([
            'name' =>
                $name,

            'email' =>
                $email,

            'subject' =>
                $subject,

            'message' =>
                $message,

            'company_website' =>
                $honeypot,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    public function rules(): array
    {
        return [
            'name' => [
                'bail',
                'required',
                'string',
                'min:2',
                'max:120',
            ],

            'email' => [
                'bail',
                'required',
                'string',
                'email:rfc',
                'max:190',
            ],

            'subject' => [
                'nullable',
                'string',
                'max:200',
            ],

            'message' => [
                'bail',
                'required',
                'string',
                'min:5',
                'max:5000',
            ],

            /*
             * Honeypot.
             *
             * Real users never see or
             * intentionally fill this.
             */
            'company_website' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' =>
                'Please enter your name.',

            'name.min' =>
                'Your name must contain at least 2 characters.',

            'email.required' =>
                'Please enter your email address.',

            'email.email' =>
                'Please enter a valid email address.',

            'message.required' =>
                'Please enter your message.',

            'message.min' =>
                'Your message must contain at least 5 characters.',

            'message.max' =>
                'Your message cannot exceed 5000 characters.',
        ];
    }
}