<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Role;
use App\Models\Group;
use App\Models\Message;
use App\Models\Conversation;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $adminRole = Role::create([
            'name' => 'admin',
            'description' => 'Administrator role',
        ]);
        $studentRole = Role::create([
            'name' => 'student',
            'description' => 'Student Role',
        ]);

        Role::create([
            'name' => 'teacher',
            'description' => 'Teacher Role',
        ]);

        User::factory()->create([
            'username' => 'admin-user-1',
            'firstname' => 'Admin',
            'lastname' => 'User',
            'email' => 'admin@admin.admin',
            'password' => bcrypt('password'),
        ])->role()->attach($adminRole);

        User::factory()->create([
            'username' => 'test-user',
            'firstname' => 'Test',
            'lastname' => 'User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ])->role()->attach($studentRole);

        User::factory(2)->teacher()->create();
        User::factory(10)->student()->create();

        for ($i=0; $i < 10; $i++) { 
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);
            $users = User::inRandomOrder()->limit(rand(2,8))->pluck('id');
            $group->users()->attach(array_unique([1, ...$users]));
        }

        Message::factory(1000)->create();
        $messages = Message::whereNull('group_id')->orderBy('created_at')->get();
        $conversations = $messages->groupBy(function($message) {
            return collect([$message->sender_id, $message->reciever_id])->sort()->implode('_');
        })->map(function($groupedMessages) {
            return [
                'user1_id' => $groupedMessages->first()->sender_id,
                'user2_id' => $groupedMessages->first()->reciever_id,
                'last_msg_id' => $groupedMessages->last()->id,
                'created_at' => new Carbon(),
                'updated_at' => new Carbon(),
            ];
        })->values();
        Conversation::insertOrIgnore($conversations->toArray());
    }
}
