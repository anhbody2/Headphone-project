<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })

    ->withExceptions(function ($exceptions) {

        // Validation errors (422)
        $exceptions->render(function (ValidationException $e, $request) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        });

        // Model not found (404)
        $exceptions->render(function (ModelNotFoundException $e, $request) {
            return response()->json([
                'status' => 'error',
                'message' => 'Resource not found',
            ], Response::HTTP_NOT_FOUND);
        });

        // Fallback (500)
        $exceptions->render(function (\Throwable $e, $request) {
            return response()->json([
                'status' => 'error',
                'message' => config('app.debug')
                    ? $e->getMessage()
                    : 'Something went wrong',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    })
    ->create();
