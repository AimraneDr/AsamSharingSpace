<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignID('conversation_id')->nullable()->constrained('conversations');
            $table->foreignID('group_id')->nullable()->constrained('groups');
            $table->foreignID('sender_id')->constrained('users');
            $table->foreignID('reciever_id')->nullable()->constrained('users');
            $table->enum('status', ['sent','arrived','seen'])->default('sent');
            $table->longText('content')->nullable();
            $table->timestamps();
        });

        Schema::table('conversations', function (Blueprint $table) {
            $table->foreignID('last_msg_id')->nullable()->default(null)->constrained('messages');
        });
        
        Schema::table('groups', function (Blueprint $table) {
            $table->foreignID('last_msg_id')->nullable()->default(null)->constrained('messages');
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
