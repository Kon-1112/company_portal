<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up(): void
    {
        Schema::create('m_departments', function (Blueprint $table) {
            // 部署ID
            $table->id('d_id');
            // 部署名
            $table->string('d_name')->unique();
            // 部署名(かな)
            $table->string('d_name_kana')->unique();
            // 部署名(略称)
            $table->string('d_name_short');
            // 部署名(略称カナ)
            $table->string('d_name_short_kana');
            // 部署カラー
            $table->string('d_color');
            // 通知用SlackチャンネルID
            $table->string('d_notify_slack_channel_id')->nullable();
            // 通知用Slackチャンネル名
            $table->string('d_notify_slack_channel_name')->nullable();
            // 勤怠打刻SlackチャンネルID
            $table->string('d_attendance_slack_channel_id')->nullable();
            // 勤怠打刻Slackチャンネル名
            $table->string('d_attendance_slack_channel_name')->nullable();
            // 作成日時
            $table->dateTime('d_created_at');
            // 更新日時
            $table->dateTime('d_updated_at');
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('m_departments');
    }
};
