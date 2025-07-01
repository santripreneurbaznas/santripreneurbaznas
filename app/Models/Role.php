<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    const SUPER_ADMIN = 1;
    const ADMIN = 2;
    const USER = 3;

    protected $fillable = ['name'];
    protected $table = 'roles';
}
