<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PusherController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('update.lastseen')->group(function () {
    Route::get('/chats', [ChatController::class, 'index'])->name('chats');
});

// Route::get('/home', function () {
//     return view('home');
// })->name('home');

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/attempt-login', [AuthController::class, 'attemptLogin'])->name('attempt-login');
Route::get('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/attempt-signup', [AuthController::class, 'attemptSignUp'])->name('attempt-signup');
Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/pusher/auth', [PusherController::class, 'pusherAuth'])
->middleware('auth');
