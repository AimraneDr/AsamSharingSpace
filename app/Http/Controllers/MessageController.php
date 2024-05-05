<?php

namespace App\Http\Controllers;

use App\Events\PublishMessageEvent;
use App\Models\Message;
use App\Models\Attachment;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the messages.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll($chat_id)
    {
        try {
            // Retrieve all messages for the specified chat_id with the associated sender
            $messages = Message::where('chat_id', $chat_id)->with('sender')->with('attachments')->get();

            // Group messages by sendDate and sort messages within each group by sendTime
            $groupedMessages = [];
            foreach ($messages as $message) {
                $sendDate = $message->sendDate;
                if (!array_key_exists($sendDate, $groupedMessages)) {
                    $groupedMessages[$sendDate] = [];
                }
                $groupedMessages[$sendDate][] = $message;
            }

            // Initialize the $formattedMessages array
            $formattedMessages = [];

            // Transform the grouped messages into the desired format
            foreach ($groupedMessages as $date => $messageList) {
                $formattedMessages[] = [
                    'date' => $date,
                    'messages' => $messageList,
                ];
            }

            // dd($formattedMessages);
            
            // Return JSON response with the messages data
            return response()->json([
                'success' => true,
                'messages' => $formattedMessages,
            ]);
        } catch (\Exception $e) {
            // Handle any exceptions (e.g., database errors)
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch messages.',
                'error' => $e->getMessage(),
            ], 500); // Return 500 Internal Server Error status code
        }
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
            'attachments.*' => 'file|mimes:jpeg,png,svg,pdf,doc,docx|max:2048',
        ]);

        $chatId = $request->chat_id;
        // $message = Message::create($request->all());

        $message = Message::create([
            'content' => $request['content'],
            'chat_id' => $request['chat_id'],
            'sender_id' => $request['sender_id'],
            'status' => 'sending', // Default status
            'sendDate' => now()->toDateString(),
            'sendTime' => now()->toTimeString(),
        ]);

        // Handle attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('uploads'); // Store file in storage/app/uploads directory
                $attachment = new Attachment([
                    'message_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'type' => $file->getClientMimeType()
                ]);
                $attachment->save();
            }
        }


        $message->update(['status' => 'sent']);
        // Publish message to the chat channel
        broadcast(new PublishMessageEvent($chatId, $message->id));



        return response()->json($message, 201);
    }
    /**
     * Display the specified message.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function get($chat_id, $msg_id)
    {
        $message = Message::with(['sender','attachments'])->find($msg_id);
        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }
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
            'attachments.*' => 'file|mimes:jpeg,png,pdf,doc,docx|max:2048',
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
