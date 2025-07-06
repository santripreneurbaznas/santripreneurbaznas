<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            // Untuk pengguna yang belum login
            return redirect()->guest(route('login'));
        }

        if (!auth()->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses sebagai Admin');
        }

        return $next($request);
    }
}
