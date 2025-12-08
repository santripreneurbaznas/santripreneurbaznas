<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryAnnouncement extends Model
{
    use HasFactory;
    protected $fillable = ['category_id', 'top_type', 'file_path'];

    protected $appends = ['public_url'];  // Menambahkan atribut virtual ke JSON model

    public function getPublicUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
        //Menghasilkan nilai untuk atribut public_url
        //Model akan otomatis punya field public_url tanpa database
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
