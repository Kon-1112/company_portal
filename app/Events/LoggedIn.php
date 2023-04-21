<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * ユーザーがログインした際に発火するイベント
 */
class LoggedIn
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var User ユーザー
     */
    public User $user;

    /**
     * コンストラクタ
     * @param $user
     */
    public function __construct($user)
    {
        $this->user = $user;
    }
}
