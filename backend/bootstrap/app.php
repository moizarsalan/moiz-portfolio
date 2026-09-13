<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(
    basePath: dirname(__DIR__)
)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(
        function (
            Middleware $middleware
        ): void {

            /*
            |--------------------------------------------------------------------------
            | API Authentication
            |--------------------------------------------------------------------------
            |
            | This Laravel application is being used as the REST API for the
            | portfolio. Unauthenticated API requests must return HTTP 401
            | instead of attempting to redirect to a named "login" route.
            |
            */

            $middleware
                ->redirectGuestsTo(
                    null
                );
        }
    )

    ->withExceptions(
        function (
            Exceptions $exceptions
        ): void {
            //
        }
    )

    ->create();