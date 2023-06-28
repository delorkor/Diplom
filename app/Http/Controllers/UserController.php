<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function postUser(Request $request)
    {
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'role' => 0,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }


    public function loginUser(Request $request)
    {
        [
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ];
        if (!Auth::attempt($request->only('email', 'password'),true)) {
            return response()->json(
                [
                    'message' => 'Email или password заданы неверно!',
                ],
                401
            );
        };
        $user = User::where('email', $request->get('email'))->firstOrFail();
        // Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;
  return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
          "user" =>$user,
    ]);  
    }


    public function createUser(Request $request)
    {
        $user = $request->user();
        // $user = User::findorFail($request->route('id'));
        $user->update(
            [ 
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),

            ]
            );
        return response()->json(
            [
                $user,
                'message' => 'Обнавлено'
            ],
            403
        );
    
    }

    public function allUser(Request $request)
    {
        $user = User::all();
        return response()->json($user);
    
    }

    public function deleteUser(Request $request)
    {
        $user = User::findorFail($request->route('id'));
        $user->delete();
        return response()->json($user);
    
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }

    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->noContent();
    }
















}
