<?php

use Illuminate\Support\Facades\Broadcast;

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

Broadcast::channel('chat.{id}', function ($user, $id) {
    // $chat = Chat::find($id);
    // if(!$chat) {
    //     return false;
    // }
    // //return if user is member of chat
    // return $chat->users()->where('id', $user->id)->exists();

    return true; // Example: Allow access for all authenticated users (replace with your logic)

});
