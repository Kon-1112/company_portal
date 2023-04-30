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
        Schema::create('t_important_communication_read_flg', function (Blueprint $table) {
            // 既読ステータスID
            $table->id('icrf_id');
            // 既読フラグ (false:未読 true:既読)
            $table->boolean('icrf_flg');
            // 既読者のメールアドレス
            $table->string('icrf_email');
            $table->foreign('icrf_email')->references('email')->on('t_users');
            // 既読対象の重要連絡ID
            $table->unsignedBigInteger('icrf_important_communication_id');
            $table->foreign('icrf_important_communication_id')->references('ic_id')->on('t_important_communications');
            // 既読日時
            $table->dateTime('icrf_read_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_important_communication_read_flg');
    }
};
