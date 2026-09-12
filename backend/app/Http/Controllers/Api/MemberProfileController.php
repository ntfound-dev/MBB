<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MemberProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MemberProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $profile = $request->user()->memberProfile;

        return response()->json([
            'member' => $profile ? $this->payload($profile) : null,
        ]);
    }

    public function upsert(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:160'],
            'nik' => ['required', 'digits:16'],
            'phone' => ['required', 'string', 'min:9', 'max:32'],
            'birth_date' => ['required', 'date', 'before:today'],
            'address' => ['required', 'string', 'max:2000'],
        ]);

        $nik = preg_replace('/\D+/', '', $validated['nik']);
        $nikHash = hash_hmac('sha256', $nik, (string) config('app.key'));

        $existing = $user->memberProfile;

        $duplicate = MemberProfile::query()
            ->where('nik_hash', $nikHash)
            ->when($existing, fn ($query) => $query->whereKeyNot($existing->id))
            ->exists();

        if ($duplicate) {
            return response()->json([
                'message' => 'NIK sudah digunakan oleh profil lain.',
            ], 422);
        }

        $profile = MemberProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'full_name' => $validated['full_name'],
                'nik_encrypted' => $nik,
                'nik_hash' => $nikHash,
                'phone' => $validated['phone'],
                'birth_date' => $validated['birth_date'],
                'address' => $validated['address'],
                'verification_status' => 'pending_verification',
                'verified_by' => null,
                'verified_at' => null,
                'rejection_reason' => null,
            ]
        );

        $user->update([
            'phone' => $validated['phone'],
            'status' => 'pending_verification',
        ]);

        return response()->json([
            'message' => 'Data keanggotaan tersimpan dan menunggu verifikasi admin.',
            'member' => $this->payload($profile),
        ]);
    }

    private function payload(MemberProfile $profile): array
    {
        return [
            'id' => $profile->id,
            'member_number' => $profile->member_number,
            'full_name' => $profile->full_name,
            'phone' => $profile->phone,
            'birth_date' => optional($profile->birth_date)->toDateString(),
            'address' => $profile->address,
            'verification_status' => $profile->verification_status,
            'verified_at' => optional($profile->verified_at)?->toISOString(),
            'rejection_reason' => $profile->rejection_reason,
        ];
    }
}
