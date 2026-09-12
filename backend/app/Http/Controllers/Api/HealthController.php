<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Throwable;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        try {
            DB::select('select 1');

            return response()->json([
                'ok' => true,
                'service' => 'podh-backend',
                'database' => 'ok',
                'environment' => app()->environment(),
            ]);
        } catch (Throwable $error) {
            report($error);

            return response()->json([
                'ok' => false,
                'service' => 'podh-backend',
                'database' => 'error',
                'environment' => app()->environment(),
            ], 503);
        }
    }
}
