<?php

namespace App\Http\Controllers;

use UserMailForm;
use App\Models\User;
use App\Mail\userRegistr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
        $dataUser=['name' => $request->get('name'), 'email' => $request->get('email'),'password' =>$request->get('password')];
        Mail::to($request->get('email'))->send(new UserMailForm($dataUser));
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
        // $dataUser=['name'=>$user->name, 'email' => $request->get('email'),'password' =>$request->get('password')];
        // Mail::to($request->get('email'))->send(new UserRegistr($dataUser));
  return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
          "user" =>$user,
    ]);  
    }


    public function createUser(Request $request)
    {
        $user = $request->user();
  
      
        if (Hash::check($request->get('password'),$user->password) && $user->id==$request->get('id') ){
        $user->update(
            [ 
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            // 'password' => Hash::make($request->get('password_now')),

            ]
           
            );
            if(strlen($request->get('password_now'))>=1){
                $user->update(
                    [ 
                    'password' => Hash::make($request->get('password_now')),
                    ]
                   
                    );
                
            }
        return response()->json(
            [
               
                'message' => 'верно'
            ],
            201
        );
    
        }
         return response()->json(
            [
                $user->id,
               
                $request->get('password_now'),
              
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
