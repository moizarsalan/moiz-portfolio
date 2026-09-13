<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ModerateReviewRequest;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminReviewController extends Controller
{
    public function index(
        Request $request
    ): JsonResponse {
        $validated = $request->validate([
            'status' => [
                'nullable',
                'string',
                'in:pending,approved,rejected',
            ],

            'search' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $query = Review::query()
            ->orderByDesc('created_at');

        if (!empty($validated['status'])) {
            $query->where(
                'status',
                $validated['status']
            );
        }

        if (!empty($validated['search'])) {
            $search = trim(
                $validated['search']
            );

            $query->where(function ($query) use ($search) {
                $query
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
                        'company',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'review',
                        'like',
                        "%{$search}%"
                    );
            });
        }

        $reviews = $query
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ]);
    }

    public function show(
        Review $review
    ): JsonResponse {
        return response()->json([
            'success' => true,

            'data' => [
                'review' => $review,
            ],
        ]);
    }

    public function moderate(
        ModerateReviewRequest $request,
        Review $review
    ): JsonResponse {
        $action =
            $request->validated()['action'];

        switch ($action) {
            case 'approve':
                $review->status = 'approved';

                /*
                 * Approval and publishing are separate.
                 *
                 * A review can only become public when
                 * the client explicitly granted consent.
                 */
                $review->published_at =
                    $review->permission_to_publish
                        ? now()
                        : null;

                break;

            case 'reject':
                $review->status = 'rejected';
                $review->published_at = null;

                break;

            case 'unpublish':
                if ($review->status !== 'approved') {
                    return response()->json([
                        'success' => false,

                        'message' =>
                            'Only an approved review can be unpublished.',
                    ], 422);
                }

                $review->published_at = null;

                break;

            case 'reset':
                $review->status = 'pending';
                $review->published_at = null;

                break;
        }

        $review->save();

        return response()->json([
            'success' => true,

            'message' =>
                'Review moderation updated successfully.',

            'data' => [
                'review' =>
                    $review->fresh(),
            ],
        ]);
    }
}