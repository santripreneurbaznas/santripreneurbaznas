<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register()
    {
        // Tangani AuthorizationException (untuk Gates/Policies)
        $this->renderable(function (\Illuminate\Auth\Access\AuthorizationException $e, $request) {
            return $this->prepareForbiddenResponse($e->getMessage(), $request);
        });

        // Tangani HttpException dengan kode 403
        $this->renderable(function (\Symfony\Component\HttpKernel\Exception\HttpException $e, $request) {
            if ($e->getStatusCode() === 403) {
                return $this->prepareForbiddenResponse($e->getMessage(), $request);
            }
            return null;
        });
    }

    protected function prepareForbiddenResponse($message, $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => $message], 403);
        }

        return Inertia::render('Errors/GreenForbidden')->toResponse($request)->setStatusCode(403);
    }
}
