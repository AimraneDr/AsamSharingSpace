<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use App\Models\Chat;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat.{id}', function (User $user, int $id) {
    $chat = Chat::find($id);
    
    if($chat && $chat->users()->where('users.id', $user->id)->exists()){
        return ['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname];
    }
});

Broadcast::channel('presence.user.{id}', function () {
    if(auth()->check())
        $user = auth()->user();
        return ['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname];
});

Broadcast::channel('user.{id}.updated', function() {
    return auth()->check();
});