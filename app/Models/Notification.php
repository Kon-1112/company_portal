<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Notifications\HasDatabaseNotifications;
use Illuminate\Notifications\Notifiable;

class Notification extends Model
{
    use HasFactory, HasDatabaseNotifications, Notifiable;

    /**
     * @var string $table
     */
    protected $table = 'notifications'; // テーブル名を指定する

    /**
     * @var string[] $fillable
     */
    protected $fillable = [
        'notifiable_id', 'notifiable_type', 'data', 'read_at'
    ];

    /**
     * @var string[] $casts
     */
    protected $casts = [
        'data' => 'array', // データをJSON形式で保存する
        'read_at' => 'datetime' // 日付形式で保存する
    ];

    /**
     * リレーション
     * @return MorphTo
     */
    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
}
