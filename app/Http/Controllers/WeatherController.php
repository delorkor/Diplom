<?php

namespace App\Http\Controllers;

use UserMailForm;
use App\Models\User;
use App\Mail\userRegistr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;


class WeatherController extends Controller
{
    public function WeatherData(Request $request)
    {


    //    $uri='https://api.openweathermap.org/data/2.5/weather?q='.$request->get('name').'&units=imperial&appid=4c205beb0b199b332f37ff275c4fcc8d';
     
       $response = Http::get('https://api.openweathermap.org/data/2.5/weather',['q'=>$request->get('name'),'units'=>'metric','appid'=>'4c205beb0b199b332f37ff275c4fcc8d']);

       return response()->json($response->body());  
    }
}
