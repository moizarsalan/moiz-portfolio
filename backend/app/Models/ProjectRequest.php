<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectRequest extends Model
{
    use HasFactory;

    /**
     * Fields that may be mass assigned.
     */
    protected $fillable = [
        'project_type',
        'project_name',
        'project_description',

        'features',
        'custom_feature',

        'pages',
        'has_existing_website',
        'existing_website_url',

        'budget',
        'timeline',

        'name',
        'email',
        'company',

        'additional_notes',

        'status',
    ];

    /**
     * Attribute casting.
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'has_existing_website' => 'boolean',
        ];
    }
}