<?php

namespace Database\Seeders;

use App\Models\Communication\CompanyCommunication;
use App\Models\Communication\ImportantCommunication;
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
         User::factory(10)->create();
         ImportantCommunication::factory(25)->create();
         CompanyCommunication::factory(25)->create();
        /******************************************************
         * マスタデータ
         *****************************************************/
        $this->call(DepartmentSeeder::class);       // 部署マスタ
        $this->call(SuperAdminUserSeeder::class);   // システム最高権限ユーザーのマスタ
        $this->call(MenuCategorySeeder::class);     // メニューカテゴリマスタ
        $this->call(MenuItemSeeder::class);         // メニューアイテムマスタ
    }
}
