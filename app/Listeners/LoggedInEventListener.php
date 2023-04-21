<?php

namespace App\Listeners;

use App\Events\LoggedIn;
use App\Notifications\Auth\LoggedInNotification;
use App\Service\UserLogService;
use Exception;

/**
 * ユーザーがログインした際に発火するイベント
 */
class LoggedInEventListener
{
    /**
     * @var UserLogService $userLogService ユーザーログサービス
     */
    private UserLogService $userLogService;

    /**
     * コンストラクタ
     * @param UserLogService $userLogService ユーザーログサービス
     */
    public function __construct(UserLogService $userLogService)
    {
        $this->userLogService = $userLogService;
    }

    /**
     * リスナーの処理を実行する
     * @param LoggedIn $event
     * @return void
     * @throws Exception
     */
    public function handle(LoggedIn $event): void
    {
        $this->userLogService->createUserLog([
            'ul_email'          => $event->user->email,
            'ul_ip_address'     => request()->ip(),
            'ul_user_agent'     => request()->header('User-Agent'),
            'ul_login_at'       => date('Y-m-d H:i:s'),
        ]);

        $event->user->notify(new LoggedInNotification());
    }
}
