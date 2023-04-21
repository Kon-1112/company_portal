<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * ユーザーがログインした際に送信する通知
 */
class LoginUserNotification extends Notification
{
    use Queueable;

    /**
     * @var string 現在日時
     */
    private string $nowDateTime;

    /**
     * コンストラクタ
     */
    public function __construct()
    {
        $this->nowDateTime = now()->format('Y年m月d日 H時i分s秒');
    }

    /**
     * チャンネルを取得する
     * @return string[]
     */
    public function via(): array
    {
        return ['mail'];
    }

    /**
     * メール通知を設定する
     * @param object $notifiable
     * @return MailMessage
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('【' . config('app.name') . '】ログインのお知らせ')
            ->greeting($notifiable['first_name'] . ' ' . $notifiable['last_name'] . ' 様')
            ->line($this->nowDateTime . 'に' . config('app.name') . 'にログインしました。')
            ->line(request()->header('User-Agent'))
            ->action('ログイン記録を確認する', url('/preferences/login-history'))
            ->line('不審なログインと思われる場合はアカウント設定よりパスワードを変更してください。');
    }
}
