<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            // Visitor information
            $table->string('name', 120);
            $table->string('email', 190);
            $table->string('subject', 200)->nullable();

            // Message content
            $table->text('message');

            // Admin workflow
            $table->string('status', 30)->default('unread');

            $table->timestamp('read_at')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamp('archived_at')->nullable();

            $table->timestamps();

            $table->index('status');
            $table->index('email');
            $table->index('created_at');
            $table->index('read_at');
            $table->index('archived_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};