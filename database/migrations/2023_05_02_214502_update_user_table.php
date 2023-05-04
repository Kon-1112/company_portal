<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * t_usersテーブルにdepartment_nameを外部キー制約で追加する
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('t_users', function (Blueprint $table) {
            // 部署名
            $table->string('department_name')->nullable();
            $table->foreign('department_name')->references('d_name')->on('m_department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_users', function (Blueprint $table) {
            $table->dropForeign('t_users_department_name_foreign');
            $table->dropColumn('department_name');
        });
    }
};

