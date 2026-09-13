<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
use App\Notifications\NewReviewNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

class ReviewController extends Controller
{
    /**
     * Return reviews that are allowed and approved
     * for public display.
     */
    public function index(): JsonResponse
    {
        $reviews =
            Review::query()
                ->where(
                    'status',
                    'approved'
                )
                ->where(
                    'permission_to_publish',
                    true
                )
                ->whereNotNull(
                    'published_at'
                )
                ->orderByDesc(
                    'published_at'
                )
                ->select([
                    'id',
                    'name',
                    'company',
                    'role',
                    'rating',
                    'review',
                    'published_at',
                ])
                ->get();

        return response()->json([
            'success' =>
                true,

            'data' =>
                $reviews,
        ]);
    }

    /**
     * Store a new review.
     */
    public function store(
        StoreReviewRequest $request
    ): JsonResponse {

        /*
        |--------------------------------------------------------------------------
        | CREATE REVIEW
        |--------------------------------------------------------------------------
        */

        $review =
            Review::create(
                $request->validated()
            );

        /*
        |--------------------------------------------------------------------------
        | FORCE MODERATION STATE
        |--------------------------------------------------------------------------
        |
        | Public users cannot publish reviews directly.
        |
        */

        $review->status =
            'pending';

        $review->published_at =
            null;

        $review->save();

        /*
        |--------------------------------------------------------------------------
        | ADMIN EMAIL NOTIFICATION
        |--------------------------------------------------------------------------
        |
        | A mail failure must never cause a successfully stored review
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
                    new NewReviewNotification(
                        $review
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
                'Thank you. Your review has been submitted for approval.',

            'data' => [
                'id' =>
                    $review->id,

                'status' =>
                    $review->status,

                'created_at' =>
                    $review->created_at,
            ],
        ], 201);
    }
}