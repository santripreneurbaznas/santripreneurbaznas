<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBaznas
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

        if (!auth()->user()->isBaznas()) {
            abort(403, 'Anda tidak memiliki akses sebagai Baznas');
        }
        return $next($request);
    }
}
