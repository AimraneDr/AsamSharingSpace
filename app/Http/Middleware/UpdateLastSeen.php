<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Events\UserUpdatedEvent;


class UpdateLastSeen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user && !Route::is('chats.*')) {
            $user->update(['lastseen' => now()]);
            // broadcast(new UserUpdatedEvent($user));
            UserUpdatedEvent::dispatch($user);
        }
        // dd("middle ware");
        return $next($request);
    }
}
