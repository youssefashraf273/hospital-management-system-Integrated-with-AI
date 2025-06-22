<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Admin;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{

// register function
    public function register(Request $request)
    {
        $rules = [
            'FullName' => 'required|string|min:10',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                function($attribute,$value,$fail){
                    if(
                        User::where('email',$value)->exists()||
                        Admin::where('email',$value)->exists()||
                        Doctor::where('email',$value)->exists()
                    ){
                        $fail('Email is already registered');
                    }
                    } ],
            'password' => 'required|string|min:6',
            'gender' => 'required|in:male,female',
            'age' => 'required|min:1',
            'phone' => 'required|min:11|max:11|unique:users',];

        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'FullName' => $request->get('FullName'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
            'age' => $request->get('age'),
            'gender' => $request->get('gender'),
            'phone' => $request->get('phone'),
        ]);
        // fromUser is a function that creates a token for the registered user by th JWT package.
        $token = JWTAuth::fromUser($user);
        return response()->json(
            [
                'user' => $user,
                'token' => $token,
                'message'=>'Registered successfully'
            ], 201);
    }

 // login function
    public function login(Request $request){
        $rules=[
            'email'=>'required|email',
            'password'=>'required'
        ];

        $validator=Validator::make($request->all(),$rules);
        if ($validator->fails()){
            return response()->json($validator->errors());
        }

        $credentials = $request->only(['email','password']);
        $guards=[
            'api'=>'user',
            'admin-api' => 'admin',
            'doctor-api' => 'doctor',
        ];

        foreach($guards as $guard => $role) {
            if ($token = Auth::guard($guard)->attempt($credentials)) {
                return response()->json([
                    'message' => 'welcome ' . $role,
                    $role . ' data' => Auth::guard($guard)->user(),
                    'token' => $token,
                ]);
            }
        }
        return response()->json(['error'=>'invalid email or password'],401);
    }

// profile function
    public function profile(Request $request){
        $token = $request->header('Authorization');
        if(!$token){
            return response()->json('unauthenticated user!');
        }
        $guards=[
            'api'=>'user',
            'admin-api' => 'admin',
            'doctor-api' => 'doctor',
        ];

            foreach($guards as $guard => $role) {
                $user = Auth::guard($guard)->setToken($token)->user();
                if ($user) {
                    return response()->json([
                        'message' => 'welcome!' . $role,
                        'data' => new UserResource($user),
                    ]);
                }
            }
                return response()->json('something went wrong');
        }

// logout function
    public function logout(Request $request){
        $token = $request->header('Authorization');
        if(!$token){
            return response()->json('unauthenticated user!');
        }
        $guards=[
            'api',
            'admin-api',
            'doctor-api' ,
        ];
            foreach($guards as $guard) {
                Auth::guard($guard)->setToken($token)->invalidate();
                return response()->json('logged out successfully!');
            }
    }
}
