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
        Schema::create('t_important_communications', function (Blueprint $table) {
            // 重要連絡ID
            $table->id('ic_id');
            // 重要連絡タイトル
            $table->string('ic_title', 100);
            // 重要連絡内容
            $table->text('ic_content');
            // 重要連絡作成者のメールアドレス
            $table->string('ic_created_by_email');
            $table->foreign('ic_created_by_email')->references('email')->on('t_users');
            // 重要連絡更新者のメールアドレス
            $table->string('ic_updated_by_email');
            $table->foreign('ic_updated_by_email')->references('email')->on('t_users');
            // 重要連絡削除者のメールアドレス
            $table->string('ic_deleted_by_email')->nullable();
            $table->foreign('ic_deleted_by_email')->references('email')->on('t_users');
            // 重要連絡削除フラグ false:未削除 true:削除
            $table->boolean('ic_delete_flag')->default(false);
            // 画像のURL
            $table->string('ic_image_url', 100)->nullable();
            // 重要連絡対象のJSON
            $table->json('ic_target_json');
            // 下書きフラグ false:下書きでない true:下書き
            $table->boolean('ic_draft_flag')->default(false);
            // 重要連絡作成日時
            $table->dateTime('ic_created_at');
            // 重要連絡更新日時
            $table->dateTime('ic_updated_at');
            // 重要連絡削除日時
            $table->dateTime('ic_deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_important_communications');
    }
};
