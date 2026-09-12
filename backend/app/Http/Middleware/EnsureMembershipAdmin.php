<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureMembershipAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, ['super_admin', 'membership_admin'], true)) {
            abort(403, 'Akses admin keanggotaan diperlukan.');
        }

        return $next($request);
    }
}
