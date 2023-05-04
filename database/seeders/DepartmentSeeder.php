<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::class::create([
            'd_name'                            => '管理者',
            'd_name_kana'                       => 'かんりしゃ',
            'd_name_short'                      => '管理者',
            'd_name_short_kana'                 => 'かんりしゃ',
            'd_color'                           => '#ff0000',
            'd_notify_slack_channel_id'         => null,
            'd_notify_slack_channel_name'       => null,
            'd_attendance_slack_channel_id'     => null,
            'd_attendance_slack_channel_name'   => null,
        ]);
    }
}
