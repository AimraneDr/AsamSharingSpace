<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Events\UserUpdatedEvent;

class UserController extends Controller
{

    public function getLastseen($user_id){
        $user = User::findOrFail($userId);
        $lastSeen = $user->last_seen;
        if ($lastSeen) {
            return response()->json(['user_id' => $user_id, 'last_seen' => $lastSeen], 200);
        }
        return response()->json(['message' => 'Failed to retrieve data'], 404);
    }

    public function setLastseen($user_id, Request $request){
        $user = User::findOrFail($user_id);
        $user->update(['lastseen' => now()->toDateString()]);

        // dd($user);
        broadcast(new UserUpdatedEvent($user));
        // Return a JSON response indicating success
        return response()->json(['message' => 'Last seen updated successfully']);
    }
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

}
