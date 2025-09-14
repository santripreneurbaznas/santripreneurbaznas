<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryArticle extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];
    protected $table = 'categories_article';

    public function articles()
    {
        return $this->hasMany(Articles::class, 'category_article_id');
    }
}
