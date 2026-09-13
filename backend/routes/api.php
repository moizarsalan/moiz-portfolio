<?php

use App\Http\Controllers\AdminMessageController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminProjectRequestController;
use App\Http\Controllers\Api\AdminReviewController;
use App\Http\Controllers\Api\ProjectRequestController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Portfolio API
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Messages
|--------------------------------------------------------------------------
|
| Public portfolio messenger.
|
| Limited to 3 submissions per 10 minutes per client.
|
*/

Route::post(
    '/messages',
    [MessageController::class, 'store']
)->middleware('throttle:3,10');

/*
|--------------------------------------------------------------------------
| Project Requests
|--------------------------------------------------------------------------
*/

Route::post(
    '/project-requests',
    [ProjectRequestController::class, 'store']
)->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Reviews
|--------------------------------------------------------------------------
*/

Route::get(
    '/reviews',
    [ReviewController::class, 'index']
);

Route::post(
    '/reviews',
    [ReviewController::class, 'store']
)->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Admin API
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Admin Authentication
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/login',
        [AdminAuthController::class, 'login']
    )->middleware('throttle:5,1');

    /*
    |--------------------------------------------------------------------------
    | Protected Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware(
        'auth:admin-api'
    )->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Admin Session
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/me',
            [AdminAuthController::class, 'me']
        );

        Route::post(
            '/logout',
            [AdminAuthController::class, 'logout']
        );

        /*
        |--------------------------------------------------------------------------
        | Messages
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/messages',
            [AdminMessageController::class, 'index']
        );

        Route::get(
            '/messages/{message}',
            [AdminMessageController::class, 'show']
        );

        Route::patch(
            '/messages/{message}/status',
            [AdminMessageController::class, 'updateStatus']
        );

        /*
        |--------------------------------------------------------------------------
        | Project Requests
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/project-requests',
            [AdminProjectRequestController::class, 'index']
        );

        Route::get(
            '/project-requests/{projectRequest}',
            [AdminProjectRequestController::class, 'show']
        );

        Route::patch(
            '/project-requests/{projectRequest}/status',
            [AdminProjectRequestController::class, 'updateStatus']
        );

        /*
        |--------------------------------------------------------------------------
        | Reviews
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/reviews',
            [AdminReviewController::class, 'index']
        );

        Route::get(
            '/reviews/{review}',
            [AdminReviewController::class, 'show']
        );

        Route::patch(
            '/reviews/{review}/moderate',
            [AdminReviewController::class, 'moderate']
        );
    });
});