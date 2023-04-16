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
        Schema::create('m_seats', function (Blueprint $table) {
            // 座席ID
            $table->string('s_id', 4)->unique()->primary();
            // 座席名
            $table->string('s_name');
            // 座席説明
            $table->text('s_description');
            // 座席X座標
            $table->smallInteger('s_x');
            // 座席Y座標
            $table->smallInteger('s_y');
            // 座席幅
            $table->smallInteger('s_width');
            // 座席高さ
            $table->smallInteger('s_height');
            // 座席角度
            $table->smallInteger('s_angle')->default(0);
            // 座席種別ステータス
            $table->smallInteger('s_type_status');
            // 座席デザインID
            $table->smallInteger('s_design_id')->default(0);
            // 座席アイコンステータス
            $table->smallInteger('s_icon_status');
            // 利用部署制限フラグ(false:制限なし, true:制限あり)
            $table->boolean('s_department_limit_flag')->default(false);
            // 部署制限ID
            $table->integer('s_department_limit_id');
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('m_seats');
    }
};
