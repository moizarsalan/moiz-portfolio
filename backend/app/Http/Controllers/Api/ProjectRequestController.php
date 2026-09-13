<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequestRequest;
use App\Models\ProjectRequest;
use App\Notifications\NewProjectRequestNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

class ProjectRequestController extends Controller
{
    public function store(
        StoreProjectRequestRequest $request
    ): JsonResponse {

        /*
        |--------------------------------------------------------------------------
        | VALIDATED DATA
        |--------------------------------------------------------------------------
        */

        $data =
            $request->validated();

        /*
        |--------------------------------------------------------------------------
        | STORE PROJECT REQUEST
        |--------------------------------------------------------------------------
        |
        | Public users are never allowed to control workflow status.
        |
        */

        $data['status'] =
            'pending';

        $projectRequest =
            ProjectRequest::create(
                $data
            );

        /*
        |--------------------------------------------------------------------------
        | ADMIN EMAIL NOTIFICATION
        |--------------------------------------------------------------------------
        |
        | Email failures must never cause an already stored project request
        | to appear as failed to the visitor.
        |
        */

        $adminEmail =
            config(
                'portfolio.admin_email'
            );

        if (
            $adminEmail
        ) {
            try {
                Notification::route(
                    'mail',
                    $adminEmail
                )->notify(
                    new NewProjectRequestNotification(
                        $projectRequest
                    )
                );
            } catch (
                \Throwable $exception
            ) {
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
            'success' =>
                true,

            'message' =>
                'Your project request has been submitted successfully.',

            'data' => [
                'project_request_id' =>
                    $projectRequest->id,
            ],
        ], 201);
    }
}