<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ChatsUsers;
use App\Models\Chat;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatsUsers>
 */
class ChatsUsersFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChatsUsers::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $chat = Chat::inRandomOrder()->first(); // Get a random chat
        $users = User::inRandomOrder()->limit(2)->get(); // Get two random users

        return [
            'chat_id' => $chat->id,
            'user_id' => $users[0]->id,
        ];
    }

    /**
     * Configure the model factory for a secondary user association.
     *
     * @return $this
     */
    public function withSecondaryUser()
    {
        return $this->state(function (array $attributes) {
            $chat = Chat::find($attributes['chat_id']);
            $otherUser = User::whereNotIn('id', [$attributes['user_id']])->inRandomOrder()->first();

            return [
                'chat_id' => $attributes['chat_id'],
                'user_id' => $otherUser->id,
            ];
        });
    }
}
