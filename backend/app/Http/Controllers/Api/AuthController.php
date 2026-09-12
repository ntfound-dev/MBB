<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuthLoginCode;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class AuthController extends Controller
{
    public function googleRedirect(): RedirectResponse
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    public function googleCallback(): RedirectResponse
    {
        try {
            $google = Socialite::driver('google')->stateless()->user();
        } catch (Throwable $error) {
            report($error);

            return redirect(
                rtrim(config('podh.frontend_url'), '/')
                . '/anggota/masuk?error=google_auth_failed'
            );
        }

        if (! $google->getEmail()) {
            return redirect(
                rtrim(config('podh.frontend_url'), '/')
                . '/anggota/masuk?error=google_email_missing'
            );
        }

        $rawCode = DB::transaction(function () use ($google): string {
            $user = User::query()
                ->where('google_id', $google->getId())
                ->orWhere('email', $google->getEmail())
                ->first();

            if (! $user) {
                $user = new User();
                $user->email = $google->getEmail();
                $user->role = 'member';
                $user->status = 'registered';
            }

            $user->google_id = $google->getId();
            $user->name = $google->getName() ?: $user->name ?: $google->getEmail();
            $user->email_verified_at ??= now();
            $user->save();

            AuthLoginCode::query()
                ->where('user_id', $user->id)
                ->whereNull('used_at')
                ->delete();

            $code = Str::random(64);

            AuthLoginCode::create([
                'user_id' => $user->id,
                'code_hash' => hash('sha256', $code),
                'expires_at' => now()->addMinutes(5),
            ]);

            return $code;
        });

        return redirect(
            rtrim(config('podh.frontend_url'), '/')
            . '/anggota/auth/callback?code='
            . urlencode($rawCode)
        );
    }

    public function exchange(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'min:40', 'max:200'],
        ]);

        $codeHash = hash('sha256', $validated['code']);

        $result = DB::transaction(function () use ($codeHash): ?array {
            $loginCode = AuthLoginCode::query()
                ->where('code_hash', $codeHash)
                ->lockForUpdate()
                ->first();

            if (! $loginCode || $loginCode->used_at || $loginCode->expires_at->isPast()) {
                return null;
            }

            $loginCode->used_at = now();
            $loginCode->save();

            $user = $loginCode->user()->with('memberProfile')->firstOrFail();
            $token = $user->createToken('podh-web')->plainTextToken;

            return [
                'token' => $token,
                'user' => $this->payload($user),
            ];
        });

        if (! $result) {
            return response()->json([
                'message' => 'Kode login tidak valid atau sudah kedaluwarsa.',
            ], 422);
        }

        return response()->json($result);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('memberProfile');

        return response()->json([
            'user' => $this->payload($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    private function payload(User $user): array
    {
        $member = $user->memberProfile;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'status' => $user->status,
            'email_verified' => (bool) $user->email_verified_at,
            'phone_verified' => (bool) $user->phone_verified_at,
            'member' => $member ? [
                'member_number' => $member->member_number,
                'full_name' => $member->full_name,
                'phone' => $member->phone,
                'birth_date' => optional($member->birth_date)->toDateString(),
                'address' => $member->address,
                'verification_status' => $member->verification_status,
                'verified_at' => optional($member->verified_at)?->toISOString(),
            ] : null,
        ];
    }
}
