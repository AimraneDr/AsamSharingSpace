<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\Conversation;
use App\Models\Group;
use App\Models\User;
use App\Http\Resources\MessageResource;
use App\Http\Requests\StoreMessageRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Events\MessageSentEvent;


class MessageController extends Controller
{
    //

    public function loadConversation($conversation_id) {
        $conversation = Conversation::findOrFail($conversation_id);
        $reciever = $conversation->getEndUser();
        $messages = Message::where('sender_id', auth()->id())->where('reciever_id', $reciever->id)
                            ->orWhere('sender_id', $reciever->id)->where('reciever_id', auth()->id())
                            ->latest()->paginate(15);
        
        return inertia("Chats",[
            'selectedConversation' => $conversation->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);
    }

    public function loadGroup($group_id) {
        $group = Group::findOrFail($group_id);
        $messages = Message::where('group_id', $group->id)->latest()->paginate(15);
        return inertia("Chats",[
            'selectedConversation' => $group->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);
    }

    public function loadOlder(int $message_id) {
        $message = Message::findOrFail($message_id);
        if($message->group_id){
            $messages = Message::where('created_at', '<', $message->created_at)
                ->where('group_id', $message->group_id)
                ->latest()->paginate(15);
        }else{
            $messages = Message::where('created_at', '<', $message->created_at)
                ->where(function ($query) use($message) {
                    $query->where('sender_id', $message->sender_id)
                        ->where('reciever_id', $message->reciever_id)
                        ->orWhere('sender_id', $message->reciever_id)
                        ->where('reciever_id', $message->sender_id);
                })
                ->latest()->paginate(15);
        }

        return MessageResource::collection($messages);
    }

    public function store(StoreMessageRequest $req) {
        // dd($req);
        $data = $req->validated();
        $data['sender_id'] = auth()->id();
        $recieverId = $data['reciever_id'] ?? null;
        $groupId = $data['group_id'] ?? null;


        if($groupId) $group = Group::findOrFail($groupId);
        if($recieverId){
            $conversation = Conversation::IdentifyConversation($recieverId, auth()->id());
            $data['conversation_id'] = $conversation->id;
        }

        $files = $data['attachments'] ?? [];

        $message = Message::create($data);
        $attachments = [];
        if($files){
            foreach($files as $file){
                $dir = 'attachments'.Str::random(32);
                Storage::makeDirectory($dir);

                $model = [
                    'msg_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'mime' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'path' => $file->store($dir, 'public')
                ];
                $attachment = MessageAttachment::create($model);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }

        if($recieverId){
            Conversation::UpdateByNewMessage($conversation, $message);
        }else if($groupId){
            Group::UpdateByNewMessage($group,$message);
        }

        MessageSentEvent::dispatch($message);

        return new MessageResource($message);
    }

    public function destroy(Message $message) {
        if($message->sender_id === auth()->id()){
            return response()->json(['message' => 'Forbidden'],403);
        }

        $message->delete();
        return response('', 204);
    }
}
