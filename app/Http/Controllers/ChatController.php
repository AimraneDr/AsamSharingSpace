<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Events\PublishMessageEvent;
use \App\Models\Chat;


class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::check()){
            $user = auth()->user();
            $userChats = $user->chats()->with(['users' => function ($query) use ($user) {
                $query->where('users.id', '!=', $user->id); // Exclude the current user
            }])->get();

            // dd($userChats);

            return inertia('Chats', [
                'user' => [
                    'id' => $user->id,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'email' => $user->email,
                    'phonenumber' => $user->phonenumber,
                    'roles' => $user->roles()->pluck('name')->toArray(),
                    'chats' => $userChats
                ],
            ]);
        }
        return redirect()->route('home');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getMemebers(int $chat_id){
        $chat = Chat::find($chat_id);
        // dd($chat);
        $users = $chat->users()->get();
        return response()->json($users, 201);
    }
}
