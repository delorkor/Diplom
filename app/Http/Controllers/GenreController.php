<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{

    public function allGenre(Request $request)
    {
        $Genres = Genre::all();
        return response()->json($Genres, 201);
    
    }

    


    public function addGenre(Request $request)
    {
        if ($request->user()->can('add',$request->user())) {
        $Genres = Genre::create([
            'name'=> $request->get('name'),
            'user_id'=> $request->user()->id

        ] );
        
        return response()->json($Genres, 201);
    }
    }

    public function deleteGenre(Request $request)
    {
        $Genres = Genre::findorFail($request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $Genres->delete();
            return response()->json($Genres, 201);
         
        }
    }

    public function updateGenre(Request $request)
    {
        $Genres = Genre::findorFail($request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $Genres->update([
           
                'name'=> $request->get('name'),
                'user_id'=> $request->user()->id
    
            ] );
            
            return response()->json($Genres, 201);
         
        }
}
}
