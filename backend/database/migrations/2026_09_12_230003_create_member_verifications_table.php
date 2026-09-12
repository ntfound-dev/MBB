<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('admin_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('decision', 32);
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index(['member_profile_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_verifications');
    }
};
