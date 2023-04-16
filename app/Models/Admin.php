<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    /**
     * @var string
     */
    protected $table = 't_admins';

    /**
     * @var string[]
     */
    protected $fillable = [
        'a_first_name',
        'a_last_name',
        'a_email',
        'a_password',
    ];

    /**
     * @var string[]
     */
    protected $hidden = [
        'a_password',
    ];

    /**
     * @var string[]
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
