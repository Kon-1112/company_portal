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
         User::factory(50)->create();
         ImportantCommunication::factory(100)->create();
         CompanyCommunication::factory(100)->create();
        $this->call(NoticeGenreSeed::class);
        $this->call(MenuCategorySeed::class);
        $this->call(MenuItemSeed::class);
    }
}
