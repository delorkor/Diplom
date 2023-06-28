<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function addCommentsFilms(Request $request)
    {
      
        $Comments = Comments::create([
           
            'text'=> $request->get('text'),
            'films_id'=> $request->route('id'),
            'user_id'=> $request->user()->id

        ] );
        
        return response()->json($Comments, 201);
     
    }


    public function updateComments(Request $request)
    {
        $comment = Comments::findorFail($request->route('id'));
        if ($request->user()->can('update',$comment)) {
            $comment->update([
           
                'text'=> $request->get('text'),
    
            ] );
            
            return response()->json($comment, 201);
         
        }
     
      
       
    }


    public function deleteComments(Request $request)
    {
        $comment = Comments::findorFail($request->route('id'));
        if ($request->user()->can('delete',$comment)) {
            $comment->delete();
        
        return response()->json($comment, 201);
        }
    }
}
