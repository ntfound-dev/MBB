<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MemberProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'member_number',
        'full_name',
        'nik_encrypted',
        'nik_hash',
        'phone',
        'birth_date',
        'address',
        'verification_status',
        'verified_by',
        'verified_at',
        'rejection_reason',
    ];

    protected $hidden = [
        'nik_encrypted',
        'nik_hash',
    ];

    protected function casts(): array
    {
        return [
            'nik_encrypted' => 'encrypted',
            'birth_date' => 'date',
            'verified_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function verificationLogs(): HasMany
    {
        return $this->hasMany(MemberVerification::class);
    }
}
