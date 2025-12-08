<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Competition extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'category_id', 'is_active', 'slug'];
    protected static function boot()
    {
        parent::boot();

        // Saat membuat baru
        static::creating(function ($model) {

            // Buat slug otomatis
            if (!$model->slug) {
                $model->slug = static::generateUniqueSlug($model->name);
            }
        });

        // Saat update dan nama berubah
        static::updating(function ($model) {
            if ($model->isDirty('name')) {
                $model->slug = static::generateUniqueSlug($model->name);
            }
        });
    }

    public static function generateUniqueSlug($name)
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }



    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
