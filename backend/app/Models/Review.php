<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    /**
     * Fields that may be submitted by a reviewer.
     *
     * status and published_at are deliberately excluded
     * because they are controlled by the backend/admin.
     */
    protected $fillable = [
        'name',
        'email',
        'company',
        'role',
        'rating',
        'review',
        'permission_to_publish',
    ];

    /**
     * Attribute casting.
     */
    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'permission_to_publish' => 'boolean',
            'published_at' => 'datetime',
        ];
    }
}