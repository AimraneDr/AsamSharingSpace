<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageAttachment extends Model
{
    use HasFactory;
    protected $fillable = [
        'msg_id',
        'name',
        'mime',
        'path',
        'size',
    ];
}
