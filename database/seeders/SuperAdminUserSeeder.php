<?php

namespace Database\Seeders;

use App\Const\UserConst;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SuperAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => hash::make('password'),
            'initial_password_flag' => false,
            'google_id' => null,
            'slack_id' => null,
            'first_name' => '管理者',
            'last_name' => '管理者',
            'first_name_kana' => 'かんりしゃ',
            'last_name_kana' => 'かんりしゃ',
            'nick_name' => '管理者',
            'blood_type_id' => null,
            'gender_id' => null,
            'birthday' => null,
            'introduction' => null,
            'avatar_url' => null,
            'department_name' => null,
            'hire_date' => null,
            'retire_date' => null,
            'receive_mail_flag' => true,
            'receive_slack_flag' => true,
            'show_notification_area_flag' => fake()->boolean,
            'attendance_flag' => fake()->boolean,
            'attendance_auto_register_flag' => fake()->boolean,
            'attendance_status_id' => fake()->numberBetween(1, 4),
            'seat_flag' => fake()->boolean,
            'seat_id' => fake()->numberBetween(1, 10),
            'normal_seat_id' => fake()->numberBetween(1, 10),
            'telework_flag' => fake()->boolean,
            'normal_workplace_flag' => fake()->numberBetween(1, 2),
            'telework_request_flag' => fake()->boolean,
            'peer_bonus_flag' => fake()->boolean,
            'evaluation_flag' => fake()->boolean,
            'position_id' => fake()->numberBetween(1, 5),
            'stage_id' => fake()->numberBetween(1, 4),
            'evaluation_period_id' => fake()->numberBetween(1, 4),
            'first_evaluation_period_start_date' => fake()->dateTimeBetween('-10 years', '-1 years'),
            'meeting_flag' => fake()->boolean,
            'role_id' => UserConst::SUPER_ADMIN_USER_ROLE,
            'created_at' => now(),
            'updated_at' => now(),
            'remember_token' => Str::random(10),
        ]);
    }
}
