<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignID('chat_id')->references('id')->on('chats')->constrained();
            $table->foreignID('sender_id')->references('id')->on('users')->constrained();
            $table->string('content');
            $table->string('attachment')->nullable();
            $table->enum('status', ['read', 'recieved', 'sent', 'sending']);
            $table->date('sendDate');
            $table->time('sendTime');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
