<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Conversation;


class MessageSentEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Message $message)
    {
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {   
        return [
            new PrivateChannel(
                $this->message->group_id 
                ? 'messages.group.'.$this->message->group_id 
                : 'messages.conversation.'.Conversation::IdentifyConversation(
                    $this->message->sender_id,
                    $this->message->reciever_id)->id
                ),
        ];
    }
    public function broadcastAs(): string{
        return 'message.sent';
    }

    public function broadcastWith(): array{
        return [
            'message' => new MessageResource($this->message)
        ];
    }
}
