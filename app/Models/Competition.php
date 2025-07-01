<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'category_id', 'is_active'];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
