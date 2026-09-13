<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_requests', function (Blueprint $table) {
            $table->id();

            // Project
            $table->string('project_type', 50);
            $table->string('project_name');
            $table->text('project_description');

            // Requirements
            $table->json('features')->nullable();
            $table->string('custom_feature')->nullable();

            // Scope
            $table->string('pages')->nullable();
            $table->boolean('has_existing_website')->default(false);
            $table->string('existing_website_url')->nullable();

            $table->string('budget', 50)->nullable();
            $table->string('timeline', 50)->nullable();

            // Client
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();

            // Additional information
            $table->text('additional_notes')->nullable();

            // Request state
            $table->string('status', 30)->default('pending');

            $table->timestamps();

            $table->index('email');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_requests');
    }
};