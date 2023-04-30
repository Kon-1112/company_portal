<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MenuItem::create([
            'mi_mc_id' => 1,
            'mi_name' => '重要連絡',
            'mi_order' => 1,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'importantCommunication.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 1,
            'mi_name' => '社内連絡',
            'mi_order' => 2,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'companyCommunication.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => '社員名簿',
            'mi_order' => 1,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'employee.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => 'プロジェクト一覧',
            'mi_order' => 2,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'project.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => 'フロアマップ',
            'mi_order' => 3,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'seat.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => '人事評価',
            'mi_order' => 4,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'evaluation.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => 'リワード',
            'mi_order' => 5,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'reward.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => '社内図書',
            'mi_order' => 6,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'library.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 3,
            'mi_name' => 'リモートワーク申請',
            'mi_order' => 1,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'remoteApplication.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 3,
            'mi_name' => '有給申請',
            'mi_order' => 2,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '',
            'mi_route' => 'paidApplication.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
    }
}
