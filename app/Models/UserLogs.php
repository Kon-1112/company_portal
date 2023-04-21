<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ユーザーログ
 * @package App\Models
 */
class UserLogs extends Model
{

    use HasFactory;

    /**
     * @var string テーブル名
     */
    protected $table = 't_user_logs';

    /**
     * @var bool タイムスタンプを使用するかどうか
     */
    public $timestamps = false;

    /**
     * @var string プライマリキー
     */
    protected $primaryKey = 'ul_id';

    /**
     * @var string[] ホワイトリスト
     */
    protected $fillable = [
        'ul_id',
        'ul_email',
        'ul_ip_address',
        'ul_user_agent',
        'ul_device',
        'ul_browser',
        'ul_os',
        'ul_login_at',
        'ul_logout_at',
    ];
}
