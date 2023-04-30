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
        Schema::create('t_company_communication_read_flg', function (Blueprint $table) {
            // 既読ステータスID
            $table->id('ccrf_id');
            // 既読フラグ (false:未読 true:既読)
            $table->boolean('ccrf_flg');
            // 既読者のメールアドレス
            $table->string('ccrf_email');
            $table->foreign('ccrf_email')->references('email')->on('t_users');
            // 既読対象の重要連絡ID
            $table->unsignedBigInteger('ccrf_important_communication_id');
            $table->foreign('ccrf_important_communication_id')->references('cc_id')->on('t_company_communications');
            // 既読日時
            $table->dateTime('ccrf_read_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_company_communication_read_flg');
    }
};
