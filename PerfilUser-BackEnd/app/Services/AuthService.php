<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        \Log::info('Tentando login com:', $credentials);
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // Revogar o token atual do usuário
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
