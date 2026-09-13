<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMessageStatusRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Message::query()
            ->latest('created_at');

        /*
        |--------------------------------------------------------------------------
        | STATUS FILTER
        |--------------------------------------------------------------------------
        */

        $status = $request->query('status');

        if (
            is_string($status) &&
            in_array(
                $status,
                [
                    'unread',
                    'read',
                    'replied',
                    'archived',
                ],
                true
            )
        ) {
            $query->where(
                'status',
                $status
            );
        }

        /*
        |--------------------------------------------------------------------------
        | SEARCH
        |--------------------------------------------------------------------------
        */

        $search = trim(
            (string) $request->query(
                'search',
                ''
            )
        );

        if ($search !== '') {
            $query->where(
                function ($subQuery) use ($search) {
                    $subQuery
                        ->where(
                            'name',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'email',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'subject',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'message',
                            'like',
                            "%{$search}%"
                        );
                }
            );
        }

        $messages =
            $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW MESSAGE
    |--------------------------------------------------------------------------
    |
    | Opening an unread message automatically marks it as read.
    |
    */

    public function show(
        Message $message
    ): JsonResponse {
        if (
            $message->status ===
            'unread'
        ) {
            $message->update([
                'status' => 'read',
                'read_at' => now(),
            ]);

            $message->refresh();
        }

        return response()->json([
            'success' => true,

            'data' => [
                'message' => $message,
            ],
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE MESSAGE WORKFLOW
    |--------------------------------------------------------------------------
    */

    public function updateStatus(
        UpdateMessageStatusRequest $request,
        Message $message
    ): JsonResponse {
        $action =
            $request->validated()[
                'action'
            ];

        switch ($action) {
            case 'read':
                $message->status =
                    'read';

                if (
                    !$message->read_at
                ) {
                    $message->read_at =
                        now();
                }

                $message->archived_at =
                    null;

                break;

            case 'unread':
                $message->status =
                    'unread';

                $message->read_at =
                    null;

                $message->archived_at =
                    null;

                break;

            case 'replied':
                $message->status =
                    'replied';

                if (
                    !$message->read_at
                ) {
                    $message->read_at =
                        now();
                }

                $message->replied_at =
                    now();

                $message->archived_at =
                    null;

                break;

            case 'archive':
                $message->status =
                    'archived';

                $message->archived_at =
                    now();

                break;

            case 'restore':
                $message->archived_at =
                    null;

                if (
                    $message->replied_at
                ) {
                    $message->status =
                        'replied';
                } elseif (
                    $message->read_at
                ) {
                    $message->status =
                        'read';
                } else {
                    $message->status =
                        'unread';
                }

                break;
        }

        $message->save();

        $message->refresh();

        return response()->json([
            'success' => true,

            'message' =>
                'Message updated successfully.',

            'data' => [
                'message' => $message,
            ],
        ]);
    }
}