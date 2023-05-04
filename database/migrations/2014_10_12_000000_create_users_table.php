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
        Schema::create('t_users', function (Blueprint $table) {
            /*** 基本情報 ***/
            // ID
            $table->string('id')->unique()->primary();
            // メールアドレス
            $table->string('email')->unique();
            // メールアドレス確認日時
            $table->timestamp('email_verified_at')->nullable();
            // パスワード
            $table->string('password');
            // 初期パスワード判定フラグ
            $table->boolean('initial_password_flag')->default(true);
            // Google ID
            $table->string('google_id')->nullable();
            // Seat ID
            $table->string('slack_id')->nullable();
            // 苗字
            $table->string('first_name');
            // 名前
            $table->string('last_name');
            // 苗字(カナ)
            $table->string('first_name_kana')->nullable();
            // 名前(カナ)
            $table->string('last_name_kana')->nullable();
            // ニックネーム
            $table->string('nick_name')->nullable();
            // 血液型ID
            $table->smallInteger('blood_type_id')->nullable();
            // 性別
            $table->smallInteger('gender_id')->nullable();
            // 生年月日
            $table->date('birthday')->nullable();
            // 自己紹介
            $table->text('introduction')->nullable();
            // プロフィール画像URL
            $table->string('avatar_url')->nullable();
            // プロフィール画像名
            $table->string('avatar_name')->nullable();
            // 入社日
            $table->date('hire_date')->nullable();;
            // 退社日
            $table->date('retire_date')->nullable();
            // 削除フラグ(false:削除していない、true:削除している)
            $table->boolean('delete_flag')->default(false);
            // ログイン失敗ロックフラグ(false:ロックしていない、true:ロックしている)
            $table->boolean('login_failure_lock_flag')->default(false);
            // メールの受信設定フラグ(false:受信しない、true:受信する)
            $table->boolean('receive_mail_flag')->default(true);
            // Slackの受信設定フラグ(false:受信しない、true:受信する)
            $table->boolean('receive_slack_flag')->default(true);
            // 通知エリア表示設定フラグ(false:表示しない、true:表示する)
            $table->boolean('show_notification_area_flag')->default(true);

            /*** 勤怠管理 ***/
            // 勤怠管理フラグ(false:管理しない、true:管理する)
            $table->boolean('attendance_flag')->nullable();
            // 勤怠自動登録利用フラグ(false:利用しない、true:利用する)
            $table->boolean('attendance_auto_register_flag')->nullable();
            // 勤怠ステータスID
            $table->smallInteger('attendance_status_id')->nullable();

            /*** 座席管理 ***/
            // 座席管理フラグ(false:管理しない、true:管理する)
            $table->boolean('seat_flag')->nullable();
            // 座席ID
            $table->smallInteger('seat_id')->nullable();
            // 通常座席ID
            $table->smallInteger('normal_seat_id')->nullable();

            /*** テレワーク管理 ***/
            // テレワーク管理フラグ(false:管理しない、true:管理する)
            $table->boolean('telework_flag')->nullable();
            // 通常勤務地ステータス
            $table->smallInteger('normal_workplace_flag')->nullable();

            /*** テレワーク申請 ***/
            // テレワーク申請機能利用フラグ(false:利用しない、true:利用する)
            $table->boolean('telework_request_flag')->nullable();

            /*** ピアボーナス制度 ***/
            // ピアボーナス制度利用フラグ(false:利用しない、true:利用する)
            $table->boolean('peer_bonus_flag')->nullable();

            /** 評価制度 **/
            // 評価制度利用フラグ(false:利用しない、true:利用する)
            $table->boolean('evaluation_flag')->nullable();
            // 役職ID(社長、部長、課長、係長、一般)
            $table->smallInteger('position_id')->nullable();
            // ステージID(新卒、中途、パート、アルバイト)
            $table->smallInteger('stage_id')->nullable();
            // 評価期間ID(1年、半年、3ヶ月、1ヶ月)
            $table->smallInteger('evaluation_period_id')->nullable();
            // 初回評価期間開始日
            $table->date('first_evaluation_period_start_date')->nullable();

            /*** 会議情報管理 ***/
            // 会議情報表示フラグ(false:表示しない、true:表示する)
            $table->boolean('meeting_flag')->nullable();

            /*** 本システム管理 ***/
            // ロールID(システム管理者、部署管理者、一般ユーザー)
            $table->string('role_id')->nullable();

            /*** その他 ***/
            // フォントタイプ
            $table->string('font_name')->default('sans-serif');
            // テーマ
            $table->string('theme_mode')->nullable();

            $table->timestamps();

            $table->rememberToken();
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('t_users');
    }
};
