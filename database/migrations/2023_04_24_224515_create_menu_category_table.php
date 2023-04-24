<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('m_menu_category', function (Blueprint $table) {
            // メニューカテゴリーID
            $table->id('mc_id');
            // メニューカテゴリー名
            $table->string('mc_name', 50);
            // メニューカテゴリー説明
            $table->string('mc_description', 100);
            // メニューカテゴリー表示順
            $table->integer('mc_order');
            // メニューカテゴリー削除フラグ false:未削除 true:削除
            $table->boolean('mc_delete_flag')->default(false);
            // 作成者メールアドレス
            $table->string('mc_created_email', 100);
            // 更新者メールアドレス
            $table->string('mc_updated_email', 100);
            // 削除者メールアドレス
            $table->string('mc_deleted_email', 100)->nullable();
            // メニューカテゴリー作成・更新日時
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_menu_category');
    }
};
