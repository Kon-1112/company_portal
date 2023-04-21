<?php

namespace App\Providers;

use App\Events\LoggedIn;
use App\Events\LoggedOut;
use App\Listeners\LoggedInNotification;
use App\Listeners\UserLogoutEventListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
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
        LoggedIn::class => [
            LoggedInNotification::class,
        ],
        LoggedOut::class => [
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
