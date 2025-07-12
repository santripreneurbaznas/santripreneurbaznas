<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array<int, string>
     */
    protected $except = [
        'super-admin/maintenance/up',
        'super-admin/maintenance',
        'login',

    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function handle($request, Closure $next)
    {
        // 1. Cek apakah aplikasi dalam maintenance mode
        if ($this->app->isDownForMaintenance()) {

            // 2. Bypass untuk route yang dikecualikan
            foreach ($this->except as $except) {
                if ($request->is($except)) {
                    return $next($request);
                }
            }

            // 3. Bypass untuk secret key
            $secret = $request->query('secret');
            if ($secret && $secret === config('app.maintenance_secret')) {
                return $next($request);
            }

            // 5. Tampilkan maintenance page untuk yang lain
            return response()->view('maintenance', [
                'secretUrl' => url($request->path()) . '?secret=' . config('app.maintenance_secret')
            ], 503);
        }

        return $next($request);
    }
}
