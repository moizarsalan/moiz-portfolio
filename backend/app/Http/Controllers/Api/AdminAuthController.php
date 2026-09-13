<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(
        AdminLoginRequest $request
    ): JsonResponse {
        $data = $request->validated();

        $admin = Admin::query()
            ->where(
                'email',
                trim($data['email'])
            )
            ->first();

        if (
            !$admin ||
            !Hash::check(
                $data['password'],
                $admin->password
            )
        ) {
            return response()->json([
                'success' => false,
                'message' =>
                    'The provided admin credentials are invalid.',
            ], 401);
        }

        /*
         * Keep only one active admin-panel token
         * for this administrator.
         */
        $admin->tokens()
            ->where(
                'name',
                'admin-panel'
            )
            ->delete();

        $token = $admin
            ->createToken(
                'admin-panel',
                ['admin']
            )
            ->plainTextToken;

        $admin->forceFill([
            'last_login_at' => now(),
        ])->save();

        return response()->json([
            'success' => true,

            'message' =>
                'Admin login successful.',

            'data' => [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'last_login_at' =>
                        $admin->last_login_at,
                ],

                'token' => $token,

                'token_type' => 'Bearer',
            ],
        ]);
    }

    public function me(
        Request $request
    ): JsonResponse {
        $admin = $request->user();

        return response()->json([
            'success' => true,

            'data' => [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'last_login_at' =>
                        $admin->last_login_at,
                ],
            ],
        ]);
    }

    public function logout(
        Request $request
    ): JsonResponse {
        $token =
            $request->user()
                ->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'success' => true,
            'message' =>
                'Admin logged out successfully.',
        ]);
    }
}