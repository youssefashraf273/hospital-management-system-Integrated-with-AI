<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json('unauthenticated user!', 401);
        }

        $guards = [
            'api',
            'admin-api',
            'doctor-api',
        ];

        foreach ($guards as $guard) {
            $user = Auth::guard($guard)->setToken($token)->user();
            if ($user) {
                return $next($request);
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

