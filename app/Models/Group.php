<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'profile',
        'owner_id',
        'last_msg_id',
    ];

    public function users() {
        return $this->belongsToMany(User::class, 'group_users');
    }

    public function lastMessage() {
        return $this->belongsTo(Message::class, 'last_msg_id');
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function owner() {
        return $this->belongsTo(User::class);
    }

    public function toConversationArray(){
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'is_group' => true,
            'is_conversation' => false,
            'users' => $this->users,
            'owner_id' => $this->owner->id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_message' => $this->lastMessage? $this->lastMessage->content : null,
            'last_message_date' => $this->lastMessage ? $this->lastMessage->created_at : null,
        ];
    }

    public static function UpdateByNewMessage(Group $group, Message $message) {
        $group->update([
            'last_msg_id' => $message->id
        ]);
    }
}
