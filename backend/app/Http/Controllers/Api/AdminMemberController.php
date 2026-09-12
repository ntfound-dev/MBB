<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MemberProfile;
use App\Models\MemberVerification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminMemberController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');

        $profiles = MemberProfile::query()
            ->with('user:id,email,name,status')
            ->when($status, fn ($query) => $query->where('verification_status', $status))
            ->latest()
            ->paginate(30);

        return response()->json($profiles);
    }

    public function verify(Request $request, MemberProfile $memberProfile): JsonResponse
    {
        $profile = DB::transaction(function () use ($request, $memberProfile) {
            $memberProfile->refresh();

            if (! $memberProfile->member_number) {
                $memberProfile->member_number = sprintf(
                    '%s-%s-%06d',
                    config('podh.member_number_prefix', 'PODH'),
                    now()->format('Y'),
                    $memberProfile->id
                );
            }

            $memberProfile->verification_status = 'verified';
            $memberProfile->verified_by = $request->user()->id;
            $memberProfile->verified_at = now();
            $memberProfile->rejection_reason = null;
            $memberProfile->save();

            $memberProfile->user()->update([
                'status' => 'verified',
            ]);

            MemberVerification::create([
                'member_profile_id' => $memberProfile->id,
                'admin_user_id' => $request->user()->id,
                'decision' => 'verified',
                'note' => $request->input('note'),
            ]);

            return $memberProfile->fresh();
        });

        return response()->json([
            'message' => 'Anggota berhasil diverifikasi.',
            'member' => $profile,
        ]);
    }

    public function reject(Request $request, MemberProfile $memberProfile): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:2000'],
        ]);

        DB::transaction(function () use ($request, $memberProfile, $validated) {
            $memberProfile->update([
                'verification_status' => 'rejected',
                'verified_by' => $request->user()->id,
                'verified_at' => null,
                'rejection_reason' => $validated['reason'],
            ]);

            $memberProfile->user()->update([
                'status' => 'rejected',
            ]);

            MemberVerification::create([
                'member_profile_id' => $memberProfile->id,
                'admin_user_id' => $request->user()->id,
                'decision' => 'rejected',
                'note' => $validated['reason'],
            ]);
        });

        return response()->json([
            'message' => 'Verifikasi anggota ditolak.',
        ]);
    }
}
