<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class SlackNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var string チャンネル
     */
    protected string $channel;

    /**
     * @var string 名前
     */
    protected string $name;

    /**
     * @var string アイコン
     */
    protected string $icon;

    /**
     * @var string タイトル
     */
    protected string $title;

    /**
     * @var string メッセージ
     */
    protected string $message;

    /**
     * @var bool 成功か失敗か
     */
    protected bool $isSuccess;

    /**
     * @var string ログイン日時
     */
    protected string $loginTime;

    /**
     * コンストラクタ
     * @param string $channel チャンネル
     * @param string $title タイトル
     * @param string $message メッセージ
     */
    public function __construct(string $channel, string $title, string $message)
    {
        $this->name = config('app.name');
        $this->icon = config('slack.icon');
        $this->title = $title;
        $this->message = $message;
        $this->channel = $channel;
        $this->loginTime = date('Y/m/d H:i:s');
    }

    /**
     * 通知の送信チャンネル
     * @return array<int, string>
     */
    public function via(): array
    {
        return ['slack', 'database', 'mail'];
    }

    /**
     * メール通知
     * @param object $notifiable ユーザー
     * @return MailMessage メールメッセージ
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->from('company.portal@spaceflow.com', 'Company Portal')
            ->greeting($notifiable['first_name'] . ' ' . $notifiable['last_name'] . ' 様')
            ->line($this->loginTime . 'に' . config("app.name") .'にログインされました。')
            ->action('ログイン記録を確認する', url('/preferences/login-history'))
            ->line('不審なログインと思われる場合はアカウント設定よりパスワードを変更してください。');
    }

    /**
     * Slack通知
     * @param object $notifiable
     * @return SlackMessage
     */
    public function toSlack(object $notifiable): SlackMessage
    {
        $sendMessage = "【{$this->title}】\n{$this->message}";
        return (new SlackMessage)
            ->from(config('app.name'))
            ->image(config('slack.icon'))
            ->to($this->channel)
            ->content($sendMessage)
            ->attachment(function ($attachment)  {
                $attachment->title('Invoice 1322')
                    ->fields([
                        'Title' => 'Server Expenses',
                        'Amount' => '$1,234',
                        'Via' => 'American Express',
                        'Was Overdue' => ':-1:',
                    ]);
            });
    }
}
