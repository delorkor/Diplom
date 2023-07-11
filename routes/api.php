<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FilmsController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// }); 
// Route::put('/create/users/{id}',[UserController::class, 'createUser'])->name('createUser'); //обнавить пользователя

Route::post('/regisration',[UserController::class, 'postUser'])->name('postUser');//Добавление пользователя
Route::post('/login',[UserController::class, 'loginUser'])->name('loginUser');//авторизация
Route::get('/Films',[FilmsController::class, 'allFilms'])->name('allFilms');//все фильм
Route::post('/FilmsSearch',[FilmsController::class, 'SearchFilms'])->name('SearchFilms');// фильм Поиск
Route::post('/Films/pages/{pages}',[FilmsController::class, 'PagesFilms'])->name('PagesFilms');//фильмы погинации
Route::get('/Films/{id}',[FilmsController::class, 'Films'])->name('Films');//фильм
Route::get('/GenreAll',[GenreController::class, 'allGenre'])->name('AllGenre');//фильм по жанрам
Route::get('/GenreFilms/{id}',[FilmsController::class, 'GenreFilms'])->name('GenreFilms');//фильм по жанрам
Route::get('/CategoryFilms',[CategoryController::class, 'CategoryAll'])->name('Category');//все котегории
Route::get('/CategoryFilms/{id}',[CategoryController::class, 'CategoryFilms'])->name('CategoryFilms');//фильм по категориям
// Route::post('/add/Films',[FilmsController::class, 'addFilms'])->name('addFilms');//***************** */
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout',[UserController::class, 'logout'])->name('logout');//выход
    Route::get('/logoutAll',[UserController::class, 'logoutAll'])->name('logoutAll');//выход
    Route::delete('/delete/users/{id}',[UserController::class, 'deleteUser'])->name('deleteUser'); //удаление пользователя
    Route::put('/create/users/{id}',[UserController::class, 'createUser'])->name('createUser'); //обнавить пользователя
    Route::get('/users',[UserController::class, 'allUser'])->name('users');//все пользователи
    Route::post('/add/Films',[FilmsController::class, 'addFilms'])->name('addFilms');//Добавление фильма
    Route::delete('/delete/Films/{id}',[FilmsController::class, 'deleteFilms'])->name('deleteFilms');//удаление фильма
    Route::put('/update/Films/{id}',[FilmsController::class, 'updateFilms'])->name('updateFilms');//редактирование
    Route::post('/Films/{id}/Comments',[CommentController::class, 'addCommentsFilms'])->name('addCommentsFilms');//Добавление коментария
    Route::delete('/delete/Comments/{id}',[CommentController::class, 'deleteComments'])->name('deleteComments');//Удаление коментария
    Route::put('/update/Comments/{id}',[CommentController::class, 'updateComments'])->name('updateComments');//обнавление коментария
    Route::post('/add/Genre',[GenreController::class, 'addGenre'])->name('addGenre');//добавление жанра
    Route::put('/update/Genre/{id}',[GenreController::class, 'updateGenre'])->name('updateGenre');//Обавление жанра
    Route::delete('/delete/Genre/{id}',[GenreController::class, 'deleteGenre'])->name('deleteGenre');//удаление жанра



    Route::post('/add/Category',[CategoryController::class, 'addCategoryFilms'])->name('addCategoryFilms');//Добавление котегории
    Route::delete('/delete/Category/{id}',[CategoryController::class, 'deleteCategory'])->name('deleteCategory');//Удаление котегории
    Route::put('/update/Category/{id}',[CategoryController::class, 'updateCategory'])->name('updateCategory');//обнавление котегории
});