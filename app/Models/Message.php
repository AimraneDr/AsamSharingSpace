<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = [
        'group_id',
        'conversation_id',
        'sender_id',
        'reciever_id',
        'status',
        'content',
    ];

    public function sender() {
        return $this->belongsTo(User::class);
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function receiver()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments() {
        return $this->hasMany(MessageAttachment::class, 'msg_id');
    }
}
