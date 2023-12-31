<?php

namespace App\Http\Controllers;

use App\Models\Films;
use App\Models\Genre;
use App\Models\Category;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilmsController extends Controller
{


    public function allFilms(Request $request)
    {
        // $films = Films::all();
        $Category = Category::all();
     
        $films = Films::query()
        
        ->orderBy('id','desc')
        ->paginate(10);
       
        foreach ($films as $key => $film) {
            $film->name_img_film=asset( Storage::url($film->name_img_film));
            $films[$key]=$film;
        }

        foreach ($films as $film) {
            $filmsG[]=$film->genres;
        }

    
        return response()->json([$films,$filmsG], 201);
     
    }
    public function PagesFilms(Request $request)
    {
        $films = Films::add();
        
        return response()->json($films, 201);
     
    }


    public function Films($id)
    {
        $films = Films::findorFail($id);
      
     
        return response()->json([$films,$films->genres,$films->category], 201);
        
     
    }
   
    public function addFilms(Request $request)
    {
        
        $genre = Genre::find($request->get('genre_id'));
        if ($request->user()->can('add',$request->user()) ) {
        $film=$request->file("films");
        $img=$request->file("name_img_film");

           Storage::disk('public')->makeDirectory('FILMS_img');
           Storage::disk('public')->makeDirectory('FILMS');
          $name_film=Storage::disk('public')->putFile('FILMS',$film);
          $name_img=Storage::disk('public')->putFile('FILMS_img',$img);
            $films = Films::create([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'Year' => $request->get('Year'),
                'user_id'=>$request->user()->id,
                // 'user_id'=>1,
                'category_id'=>$request->get('category_id'),
                'name_film'=>$name_film,
                'name_img_film'=>$name_img,
               
            ]);
            $films->genres()->attach($genre);
            // $films->genres()->attach([1,2,3,4]);
        // return response()->json($request->user()->id, 201);
        return response()->json($films, 201);
        if (is_uploaded_file($name_film)) {
           
        }
            
        }
        else {
            return response()->json([
              
                'massage'=>"вы не администратор",
                ]
            );
        }
     
    }


    public function deleteFilms(Request $request)
    {
         

        $films=Films::findorFail($request->route('id'));
        $comments =Comments::where('films_id',$request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $films->genres()->detach();
            $comments->delete();
            $films->delete();
            Storage::disk('public')->delete($films->name_film);
            Storage::disk('public')->delete($films->name_img_film);
            // $genre = Genre::find($request->get('id')); // Modren Chairs, Home Chairs
            return response()->json($films, 201);
        }
        else {
            return response()->json([
              
                'massage'=>"вы не администратор",
                ]
            );
        }
     
    }

     public function updateFilms(Request $request)
    {
        $genre = Genre::find($request->get('genre_id'));
        $films = Films::findorFail($request->route('id'));
        if ($request->user()->can('add',$request->user())) {
            $films->update([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'Year' => $request->get('Year'),
                'user_id'=>$request->user()->id,
                'category_id'=>$request->get('category_id'),
            ]);
            $films->genres()->detach();
            $films->genres()->attach($genre);
       
            return response()->json($films, 201);
        }
        else {
            return response()->json([
                $films,
                'massage'=>"вы не администратор",
                ]
            );
        }
     
    }

    
public function GenreFilms(Request $request,$id)

{   
    $genres = Genre::findorFail($id);
//    foreach ($genres as  $value) {
//     $sun=$value->films()->get();
//    }
$sun=$genres->films()->orderBy('id','desc')->paginate(10);
foreach ($sun as $key => $value) {
    $value->name_img_film=asset( Storage::url($value->name_img_film));
    $sun[$key]=$value;
}

foreach ($sun as $value) {
    $sunG[]=$value->genres;
}
return response()->json([$sun,$sunG], 201);
//  return response()->json($sun); 

}




 public function SearchFilms(Request $request){
    $Name= $request->input('text');
    $Search= Films::query()->where('name', 'like',"%{$Name}%")->orderBy('id','desc')->paginate(10);
    foreach ($Search as $key => $value) {
        $value->name_img_film=asset( Storage::url($value->name_img_film));
        $Search[$key]=$value;
    }
    $SearchG=[];
    if ($Search) {
        foreach ($Search as $value) {
          
           
            $SearchG[]=$value->genres;
       
        }
        
            return response()->json([$Search, $SearchG],201);
     
            
    
       
    }
    // dd($Search);
    // return response()->json([],404);
  
 
 
}


}