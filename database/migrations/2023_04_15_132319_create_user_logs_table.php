<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create('t_user_logs', function (Blueprint $table) {
            // ID
            $table->bigIncrements('ul_id');
            // ユーザーID
            $table->string('ul_id');
            // ログインIPアドレス
            $table->string('ul_ip_address', 45);
            // ログインユーザーエージェント
            $table->string('ul_user_agent');
            // ログイン日時
            $table->timestamp('ul_login_at')->nullable();
            // ログアウト日時
            $table->timestamp('ul_logout_at')->nullable();
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('t_user_logs');
    }
};
