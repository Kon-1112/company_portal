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
        Schema::create('m_menu_item', function (Blueprint $table) {
            // メニューアイテムID
            $table->id('mi_id');
            // メニューカテゴリーID
            $table->unsignedBigInteger('mi_mc_id');
            $table->foreign('mi_mc_id')->references('mc_id')->on('m_menu_category');
            // メニューアイテムのアイコン名
            $table->string('mi_icon', 50);
            // 表示順
            $table->integer('mi_order');
            // 遷移URL
            $table->string('mi_url');
            // 遷移ルーティング
            $table->string('mi_route');
            // メニューカラー
            $table->string('mi_color', 7);
            // メニューアイテム名
            $table->string('mi_name', 10);
            // 削除フラグ false:未削除 true:削除
            $table->boolean('mi_delete_flag')->default(false);
            // 作成者メールアドレス
            $table->string('mi_created_email', 100);
            // 更新者メールアドレス
            $table->string('mi_updated_email', 100);
            // 削除者メールアドレス
            $table->string('mi_deleted_email', 100)->nullable();
            // メニューアイテム作成・更新日時
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('m_menu_item');
    }
};
