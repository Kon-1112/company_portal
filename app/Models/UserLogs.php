<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogs extends Model
{
    use HasFactory;

    /**
     * @var string
     */
    protected $table = 't_user_logs';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var string
     */
    protected $primaryKey = 'ul_id';

    /**
     * @var string[]
     */
    protected $fillable = [
        'ul_id',
        'ul_id',
        'ul_ip_address',
        'ul_user_agent',
        'ul_device',
        'ul_browser',
        'ul_os',
        'ul_login_at',
        'ul_logout_at',
    ];
}
