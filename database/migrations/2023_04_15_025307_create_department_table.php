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
        Schema::create('m_department', function (Blueprint $table) {
            // 部署ID
            $table->id('d_id');
            // 部署名
            $table->string('d_name');
            // 部署名(カナ)
            $table->string('d_name_kana');
            // 部署名(英語)
            $table->string('d_name_en');
            // 部署名(略称)
            $table->string('d_name_short');
            // 部署名(略称カナ)
            $table->string('d_name_short_kana');
            // 部署カラー
            $table->string('d_color');
            // 勤怠打刻SlackチャンネルID
            $table->string('d_attendance_slack_channel_id')->nullable();
            // 勤怠打刻Slackチャンネル名
            $table->string('d_attendance_slack_channel_name')->nullable();
            // 勤怠打刻SlackチャンネルURL
            $table->string('d_attendance_slack_channel_url')->nullable();
            // 勤怠打刻Slackチャンネルトークン
            $table->string('d_attendance_slack_channel_token')->nullable();
            // 勤怠打刻Slackチャンネルシークレット
            $table->string('d_attendance_slack_channel_secret')->nullable();
            // 勤怠打刻SlackチャンネルワークスペースID
            $table->string('d_attendance_slack_channel_workspace_id')->nullable();
            // 勤怠打刻Slackチャンネルワークスペース名
            $table->string('d_attendance_slack_channel_workspace_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('m_department');
    }
};
