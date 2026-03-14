<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $messages = [
            'email.required' => 'We need your email address to create an account.',
            'email.email'    => 'That doesn\'t look like a real email address.',
            'email.unique'   => 'This email is already in our system. Try logging in!',
            'user_name.max'  => 'Your username is a bit too long (max 255 characters).',
        ];
        $request->validate(
            [
                'user_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6|confirmed',
                'role' => 'string',
                'image' => 'string|nullable',
            ],$messages
        );

        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

        ]);
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'user' => auth('api')->user(),
            'token' => $token,
        ], 201);
    }

    public function changePasswordByEmail(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        // 2. Find user
        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // 3. Update the CORRECT field (usually 'password')
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // 4. Response
        return response()->json([
            'status'  => 'success',
            'message' => 'Password has been updated for ' . $user->email,
        ], 200);
    }
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function refresh()
    {
        return response()->json([
            'token' => JWTAuth::refresh(JWTAuth::getToken()),
        ]);
    }
}
