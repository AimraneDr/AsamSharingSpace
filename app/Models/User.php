<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'firstname',
        'lastname',
        'profile',
        'email',
        'email_veryfied_at',
        'last_seen_at',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function fullname(){
        return $this->lastname.' '.$this->firstname;
    }
    public function groups(){
        return $this->belongsToMany(Group::class, 'group_users');
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class, 'user1_id')
                    ->orWhere('user2_id', $this->id);
    }

    public function isBlocked(){
        return $this->blocked_at === null ? false : true;
    }

    public function role(){
        return $this->belongsToMany(Role::class, 'user_roles');
    }

}
