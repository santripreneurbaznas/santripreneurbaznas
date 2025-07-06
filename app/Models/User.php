<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $role_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Category[] $managedCategories
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Registration[] $registrations
 * @property-read \App\Models\Role|null $role
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AdminCategoryAccessModel[] $categoryAccesses
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'nik',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',

    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function managedCategories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'admin_category_access',
            'user_id',
            'category_id'
        );
    }

    public function categoryAccesses(): HasMany
    {
        return $this->hasMany(AdminCategoryAccessModel::class);
    }

    public function isSuperAdmin(): bool
    {
        return $this->role_id === Role::SUPER_ADMIN;
    }

    public function isAdmin(): bool
    {
        return $this->role_id === 2;
    }

    public function isUser(): bool
    {
        return $this->role_id === Role::USER;
    }
}
