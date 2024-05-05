<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PusherController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('chats/{chat_id}/users', [ChatController::class, 'getMemebers']);
Route::get('chats/{chat_id}/messages', [MessageController::class, 'getAll']);
Route::get('chats/{chat_id}/message/{msg_id}', [MessageController::class, 'get']);
Route::post('chats/{chat_id}/messages/send', [MessageController::class, 'store']);
Route::get('users/{user_id}/last_seen', [UserController::class, 'getLastseen']);
Route::post('users/{user_id}/last_seen', [UserController::class, 'setLastseen']);

Route::post('files/upload', [MessageController::class, 'uploadFile']);
