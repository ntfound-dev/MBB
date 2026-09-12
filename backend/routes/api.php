<?php

use App\Http\Controllers\Api\AdminMemberController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\MemberProfileController;
use App\Http\Middleware\EnsureMembershipAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::prefix('auth')->group(function () {
    Route::get('/google/redirect', [AuthController::class, 'googleRedirect']);
    Route::get('/google/callback', [AuthController::class, 'googleCallback']);
    Route::post('/exchange', [AuthController::class, 'exchange']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/member/profile', [MemberProfileController::class, 'show']);
    Route::put('/member/profile', [MemberProfileController::class, 'upsert']);

    Route::prefix('admin/members')
        ->middleware(EnsureMembershipAdmin::class)
        ->group(function () {
            Route::get('/', [AdminMemberController::class, 'index']);
            Route::post('/{memberProfile}/verify', [AdminMemberController::class, 'verify']);
            Route::post('/{memberProfile}/reject', [AdminMemberController::class, 'reject']);
        });
});
