<?php

namespace App\Models;

use App\Models\User;
use App\Models\Films;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comments extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'films_id',
        'user_id',
    ];
    public function CommentUser(){
        return $this->belongsTo(User::class,'user_id');
        // return $this->hasMany(Films::class,'films_id','id');
    }
}
