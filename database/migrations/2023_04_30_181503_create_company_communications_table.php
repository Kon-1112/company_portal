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
        Schema::create('t_company_communications', function (Blueprint $table) {
            // 会社連絡ID
            $table->id('cc_id');
            // 会社連絡タイトル
            $table->string('cc_title', 100);
            // 会社連絡内容
            $table->text('cc_content');
            // カテゴリID
            $table->smallInteger('cc_category_id');
            // 期限日時
            $table->dateTime('cc_deadline_at');
            // 会社連絡作成者のメールアドレス
            $table->string('cc_created_by_email');
            $table->foreign('cc_created_by_email')->references('email')->on('t_users');
            // 会社連絡更新者のメールアドレス
            $table->string('cc_updated_by_email');
            $table->foreign('cc_updated_by_email')->references('email')->on('t_users');
            // 会社連絡削除者のメールアドレス
            $table->string('cc_deleted_by_email')->nullable();
            $table->foreign('cc_deleted_by_email')->references('email')->on('t_users');
            // 会社連絡削除フラグ false:未削除 true:削除
            $table->boolean('cc_delete_flag')->default(false);
            // 画像のURL
            $table->string('cc_image_url', 100)->nullable();
            // 会社連絡対象のJSON
            $table->json('cc_target_json');
            // 下書きフラグ false:下書きでない true:下書き
            $table->boolean('cc_draft_flag')->default(false);
            // 会社連絡作成日時
            $table->dateTime('cc_created_at');
            // 会社連絡更新日時
            $table->dateTime('cc_updated_at');
            // 会社連絡削除日時
            $table->dateTime('cc_deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_company_communications');
    }
};
