<?php

use Illuminate\Support\Facades\Broadcast;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Conversation;

Broadcast::channel('online', function(User $user){
    return $user ? new UserResource($user): null;
});
//messages.conversation.4
Broadcast::channel('messages.conversation.{conversationId}', function(User $user, int $conversationId){
    $conversation = Conversation::find($conversationId);
    if($conversation){
        return $conversation->user1_id === $user->id || $conversation->user2_id === $user->id;
    }
    return false;
});

Broadcast::channel('messages.group.{groupId}', function(User $user, int $groupId){
    return $user->groups->contains('id', $groupId);
});