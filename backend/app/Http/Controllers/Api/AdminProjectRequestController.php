<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProjectRequestStatusRequest;
use App\Models\ProjectRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminProjectRequestController extends Controller
{
    public function index(
        Request $request
    ): JsonResponse {
        $validated = $request->validate([
            'status' => [
                'nullable',
                'string',
                'in:pending,contacted,in-progress,completed,rejected',
            ],

            'search' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $query = ProjectRequest::query()
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
                        'project_name',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
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
                    );
            });
        }

        $projectRequests = $query
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $projectRequests,
        ]);
    }

    public function show(
        ProjectRequest $projectRequest
    ): JsonResponse {
        return response()->json([
            'success' => true,

            'data' => [
                'project_request' =>
                    $projectRequest,
            ],
        ]);
    }

    public function updateStatus(
        UpdateProjectRequestStatusRequest $request,
        ProjectRequest $projectRequest
    ): JsonResponse {
        $projectRequest->status =
            $request->validated()['status'];

        $projectRequest->save();

        return response()->json([
            'success' => true,

            'message' =>
                'Project request status updated successfully.',

            'data' => [
                'project_request' =>
                    $projectRequest->fresh(),
            ],
        ]);
    }
}