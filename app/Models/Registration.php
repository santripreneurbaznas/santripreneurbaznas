<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'competition_id', 'status', 'category_id', 'place_of_birth', 'date_of_birth', 'gender', 'address', 'boarding_school_name', 'motivation', 'estimated_monthly_income', 'number_wa', 'business_proposal_file', 'mustahik_certificate_file', 'pesantren_certificate_file'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
