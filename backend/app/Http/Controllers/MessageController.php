<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use App\Notifications\NewPortfolioMessageNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

class MessageController extends Controller
{
    public function store(
        StoreMessageRequest $request
    ): JsonResponse {

        /*
        |--------------------------------------------------------------------------
        | HONEYPOT
        |--------------------------------------------------------------------------
        */

        if (
            $request->filled(
                'company_website'
            )
        ) {
            return response()->json([
                'success' => true,

                'message' =>
                    'Your message has been sent successfully.',

                'data' => [
                    'message_id' =>
                        null,
                ],
            ], 201);
        }

        /*
        |--------------------------------------------------------------------------
        | VALIDATED DATA
        |--------------------------------------------------------------------------
        */

        $data =
            $request->validated();

        unset(
            $data[
                'company_website'
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | DUPLICATE PROTECTION
        |--------------------------------------------------------------------------
        */

        $duplicate =
            Message::query()
                ->where(
                    'email',
                    $data['email']
                )
                ->where(
                    'message',
                    $data['message']
                )
                ->where(
                    'created_at',
                    '>=',
                    now()->subMinutes(
                        2
                    )
                )
                ->latest(
                    'created_at'
                )
                ->first();

        if ($duplicate) {
            return response()->json([
                'success' => true,

                'message' =>
                    'Your message has already been received.',

                'data' => [
                    'message_id' =>
                        $duplicate->id,
                ],
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | STORE
        |--------------------------------------------------------------------------
        */

        $message =
            Message::create(
                $data
            );

        /*
        |--------------------------------------------------------------------------
        | ADMIN EMAIL NOTIFICATION
        |--------------------------------------------------------------------------
        |
        | A notification failure must not cause the visitor's
        | successfully stored message to fail.
        |
        */

        $adminEmail =
            config(
                'portfolio.admin_email'
            );

        if ($adminEmail) {
            try {
                Notification::route(
                    'mail',
                    $adminEmail
                )->notify(
                    new NewPortfolioMessageNotification(
                        $message
                    )
                );
            } catch (\Throwable $exception) {

                /*
                 * Record mail problems in Laravel logs,
                 * but preserve the successful public submission.
                 */

                report(
                    $exception
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,

            'message' =>
                'Your message has been sent successfully.',

            'data' => [
                'message_id' =>
                    $message->id,
            ],
        ], 201);
    }
}