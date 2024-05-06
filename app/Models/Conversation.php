<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'user1_id',
        'user2_id',
        'last_msg_id'
    ];

    public function user1() {
        return $this->belongsTo(User::class, 'user1_id');
    }
    public function user2() {
        return $this->belongsTo(User::class, 'user2_id');
    }

    public function lastMessage() {
        return $this->belongsTo(Message::class, 'last_msg_id');
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function toConversationArray(){
        $endUser = $this->getEndUser();
        return [
            'id' => $this->id,
            'title' => $endUser->fullname(),
            'is_group' => false,
            'is_conversation' => true,
            'end_user' => $endUser,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'blocked_at' => $endUser->blocked_at,
            'last_message' => $this->lastMessage? $this->lastMessage->content : null,
            'last_message_date' => $this->lastMessage ? $this->lastMessage->created_at : null,
        ];
    }


    public static function IdentifyConversation(int $user1, int $user2) {
        if (!$user1 || !$user2) return null;

        $conversation = Conversation::where('user1_id', $user1)->where('user2_id', $user2)->first();
        if (!$conversation) {
            $conversation = Conversation::where('user1_id', $user2)->where('user2_id', $user1)->first();
        }
        return $conversation;
    }

    /**
     * get the end user of the conversation relatively to the passed user.
     * Note: in most cases, relatively to the currently auth user.
     */
    public static function EndUser(Conversation $conversation, User $user) {
        return $user->id === $conversation->user1->id ? $conversation->user2 : $conversation->user1; 
    }

    public function getEndUser() {
        return auth()->id() === $this->user1->id ? $this->user2 : $this->user1; 
    }

    public static function getCOnversationsForListView(User $user){
        //get conversations and filter out blocked users for non admin
        $conversations = $user->conversations()->get()->filter(function ($c) use($user) {
            return $user->role->first()->name === 'admin' ? true : !Conversation::EndUser($c, $user)->isBlocked();
        });
        $groups = $user->groups()->get();

        return $conversations->map(function ($conversation) {
            return $conversation->toConversationArray();
        })->concat($groups->map(function($group) {
            return $group->toConversationArray();
        }));
    }

    public static function UpdateByNewMessage(Conversation $conversation, Message $message) {
        if($conversation){
            $conversation->update([
                'last_msg_id' => $message->id
            ]);
        }
    }
}
