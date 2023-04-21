<?php

namespace App\Listeners;

use App\Events\LoggedOut;
use App\Service\UserLogService;
use Exception;

/**
 * ユーザーがログアウトした際に発火するイベント
 */
class LoggedOutEventListener
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
     * @param LoggedOut $event
     * @return void
     * @throws Exception
     */
    public function handle(LoggedOut $event): void
    {
        $this->userLogService->createUserLog([
            'ul_email'          => $event->user->email,
            'ul_ip_address'     => request()->ip(),
            'ul_user_agent'     => request()->header('User-Agent'),
            'ul_logout_at'      => date('Y-m-d H:i:s'),
        ]);
    }
}
