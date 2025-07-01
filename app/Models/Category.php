<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'is_active', 'competition_id'];

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function admins()
    {
        return $this->belongsToMany(User::class, 'admin_category_access');
    }

    public function adminAccesses()
    {
        return $this->hasMany(AdminCategoryAccessModel::class);
    }


    public function accessibleAdmins()
    {
        return $this->belongsToMany(User::class, 'admin_category_access');
    }
}
