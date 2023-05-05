<?php

namespace Database\Seeders;

use App\Models\Communication\CompanyCommunication;
use App\Models\Communication\ImportantCommunication;
use App\Models\Communication\ImportantCommunicationReadFlg;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run(): void
    {
        /******************************************************
         * テストデータ
         *****************************************************/
         User::factory(1)->create();
         ImportantCommunication::factory(50)->create();
         ImportantCommunicationReadFlg::factory(50)->create();
//         CompanyCommunication::factory(10)->create();
        /******************************************************
         * マスタデータ
         *****************************************************/
        $this->call(DepartmentSeeder::class);       // 部署マスタ
        $this->call(SuperAdminUserSeeder::class);   // システム最高権限ユーザーのマスタ
        $this->call(MenuCategorySeeder::class);     // メニューカテゴリマスタ
        $this->call(MenuItemSeeder::class);         // メニューアイテムマスタ
    }
}
