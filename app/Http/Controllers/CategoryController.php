<?php

namespace App\Http\Controllers;

use App\Models\Films;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function CategoryFilms($id)
{   
    $category = Films::where('category_id',$id)->orderBy('id','desc')->paginate(10);
    foreach ($category as $key => $categr) {
        $categr->name_img_film=asset( Storage::url($categr->name_img_film));
        $category[$key]=$categr;
    }
    
    foreach ($category as $value) {
        $categoryG[]=$value->genres;
    }
    return response()->json([$category,$categoryG], 201);
//  return response()->json($category); 

}
    public function CategoryAll()
    {
        $Category = Category::all();
        return response()->json($Category, 201);
     
    }
    public function CategoryOne($id)
    {
        $Category = Category::findorFail($id);
        return response()->json($Category, 201);
     
    }
   
    public function addCategoryFilms(Request $request)
    {
      
        $Category = Category::create([
            'text'=> $request->get('text'),
        ] );
        
        return response()->json($Category, 201);
     
    }


    public function updateCategory(Request $request)
    {
        $comment = Category::findorFail($request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $comment->update([
           
                'text'=> $request->get('text'),
    
            ] );
            
            return response()->json($comment, 201);
         
        }
     
      
       
    }


    public function deleteCategory(Request $request)
    {
        $comment = Category::findorFail($request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $comment->delete();
        
        return response()->json($comment, 201);
        }
    }
}
