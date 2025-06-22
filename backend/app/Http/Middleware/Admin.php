<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');
        if(!$token){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        try{
            if(Auth::guard('admin-api')->setToken($token)->check()){
            return $next($request);
            }
        }
        catch (TokenExpiredException  $ex){
            return response()->json(['error' => 'Token Expired'], Response::HTTP_UNAUTHORIZED);
        }catch (TokenInvalidException  $ex){
            return response()->json(['error' => 'Token Invalid'], Response::HTTP_UNAUTHORIZED);
        }
    return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
    }
}
