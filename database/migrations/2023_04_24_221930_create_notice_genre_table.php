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
        Schema::create('notice_genre', function (Blueprint $table) {
            // お知らせジャンルID
            $table->id('ng_id');
            // お知らせジャンル名
            $table->string('ng_name', 20);
            // お知らせジャンル説明
            $table->string('ng_description', 100);
            // 通知重要度レベル 1:重要 2:普通 3:軽微
            $table->integer('ng_level');
            // 表示カラー(16進数)
            $table->string('ng_color', 7)->default('#4287f5');
            // 既読必須フラグ 0:不要 1:必要
            $table->boolean('ng_read_flag');
            // 作成日時
            $table->timestamps();
            // 削除日時
            $table->softDeletes();
            // 削除フラグ 0:未削除 1:削除済
            $table->boolean('ng_delete_flag')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('notice_genre');
    }
};
