<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
    ];

    public function films(){
        return $this->hasMany(Category::class,'category_id','id');
    }
}
