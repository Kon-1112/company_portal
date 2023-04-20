<?php

namespace App\Listeners;

use App\Events\LoginUser;
use App\Notifications\LoginUserNotification;
use App\Service\UserLogService;
use Exception;

/**
 * ユーザーがログインした際に発火するイベント
 */
class UserLoginEventListener
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
     * @param LoginUser $event
     * @return void
     * @throws Exception
     */
    public function handle(LoginUser $event): void
    {
        $user = $event->user;

        // ログインログを作成する
        $this->userLogService->createUserLog([
            'ul_u_id'           => $user->u_id,
            'ul_ip_address'     => request()->ip(),
            'ul_user_agent'     => request()->header('User-Agent'),
            'ul_login_at'       => date('Y-m-d H:i:s'),
        ]);

        // ログインお知らせメールを送信する
        $user->notify(new LoginUserNotification());
    }
}
