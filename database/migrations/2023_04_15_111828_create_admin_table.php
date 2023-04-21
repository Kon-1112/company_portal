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
        Schema::create('m_admins', function (Blueprint $table) {
            // 管理ID
            $table->id('a_id');
            // 管理者メールアドレス
            $table->string('a_email');
            // 管理者パスワード
            $table->string('a_password');
            // 管理者苗字
            $table->string('a_first_name');
            // 管理者名前
            $table->string('a_last_name');
            // 管理者名(カナ)
            $table->string('a_name_kana');
            // 管理者名(英語)
            $table->string('a_name_en');
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('m_admins');
    }
};
