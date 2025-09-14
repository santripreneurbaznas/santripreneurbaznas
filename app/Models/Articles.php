<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'content', 'slug', 'image', 'category_article_id'];

    public function category()
    {
        return $this->belongsTo(CategoryArticle::class, 'category_article_id');
    }
}
