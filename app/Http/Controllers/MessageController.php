<?php

namespace App\Http\Controllers;

use App\Events\PublishMessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the messages.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $messages = Message::where('chat_id', $id)->get();
        return response()->json($messages);
    }

    /**
     * Store a newly created message in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'sender_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'attachment' => 'nullable|string',
            'status' => 'required|in:read,received,out,wait',
            'sendDate' => 'required|date',
            'sendTime' => 'required|date_format:H:i:s',
        ]);

        $chatId = $request->chat_id;
        $message = Message::create($request->all());

        // Publish message to the chat channel
        // PublishMessageEvent::dispatch($chatId, $message->content);
        // event(new PublishMessageEvent($chatId, $message->content));
        broadcast(new PublishMessageEvent($chatId, $message->content));



        return response()->json($message, 201);
    }
    /**
     * Display the specified message.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        return response()->json($message);
    }

    /**
     * Update the specified message in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        $request->validate([
            'chat_id' => 'sometimes|required|exists:chats,id',
            'sender_id' => 'sometimes|required|exists:users,id',
            'attachment' => 'nullable|string',
            'status' => 'sometimes|required|in:read,received,out,wait',
            'sentDate' => 'sometimes|required|date',
            'sentTime' => 'sometimes|required|date_format:H:i:s',
        ]);

        $message->update($request->all());
        return response()->json($message, 200);
    }

    /**
     * Remove the specified message from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(null, 204);
    }
}
