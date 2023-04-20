<?php

namespace App\Providers;

use App\Events\LoginUser;
use App\Events\LogoutUser;
use App\Events\RegisteredUser;
use App\Listeners\UserLoginEventListener;
use App\Listeners\UserLogoutEventListener;
use App\Listeners\UserRegisteredEventListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * 登録するイベントとリスナーのマッピングを行う
     * @var array[]
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        LoginUser::class => [
            UserLoginEventListener::class,
        ],
        LogoutUser::class => [
            UserLogoutEventListener::class,
        ]
    ];

    /**
     * このプロバイダーの登録を遅らせる
     * @return void
     */
    public function boot(): void
    {
        //
    }

    /**
     * イベントとリスナーを自動的に検出するかどうかを決定する
     * @return bool
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
