<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/',[HomeController::class, 'home'])->name('home');
    Route::get('/dashboard',[UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/chats',[ChatController::class, 'chats'])->name('chats');

    Route::get('/chats/conversation-{conversation_id}',[MessageController::class, 'loadConversation'])->name('chats.conversation');
    Route::get('/chats/group-{group_id}',[MessageController::class, 'loadGroup'])->name('chats.group');
    Route::post('/message', [MessageController::class, 'store'])->name('message.store');
    Route::delete('/messages/{message_id}', [MessageController::class, 'destroy'])->name('message.delete');
    Route::get('/messages/older/{message_id}', [MessageController::class, 'loadOlder'])->name('messages.loadOlder');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
