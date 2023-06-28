<?php

namespace App\Models;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Films extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'Year',
        'user_id',
        'category_id',
        'name_film',
        'name_img_film',
    ];

    public function genres(){
        return $this->belongsToMany(Genre::class,'films_genres','films_id','genre_id');
    }
    
}
