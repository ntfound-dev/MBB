<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class PromoteAdmin extends Command
{
    protected $signature = 'podh:promote-admin
        {email : Email akun yang sudah pernah login}
        {--role=super_admin : Role admin}';

    protected $description = 'Promosikan akun PODH menjadi admin';

    public function handle(): int
    {
        $role = (string) $this->option('role');

        $allowed = [
            'super_admin',
            'membership_admin',
            'training_admin',
            'finance_admin',
            'activity_admin',
            'request_admin',
            'alumni_admin',
        ];

        if (! in_array($role, $allowed, true)) {
            $this->error('Role tidak valid.');
            return self::FAILURE;
        }

        $user = User::query()
            ->where('email', $this->argument('email'))
            ->first();

        if (! $user) {
            $this->error('User belum ada. Login Google dulu.');
            return self::FAILURE;
        }

        $user->update(['role' => $role]);

        $this->info("{$user->email} => {$role}");

        return self::SUCCESS;
    }
}
