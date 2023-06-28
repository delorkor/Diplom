<?php

namespace App\Models;

use App\Models\Films;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Genre extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
    ];

    public function films(){
        return $this->belongsToMany(Films::class,'films_genres','genre_id','films_id');
    }
}
