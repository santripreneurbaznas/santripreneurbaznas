<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminCategoryAccessModel extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'category_id'];
    protected $table = 'admin_category_access';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
