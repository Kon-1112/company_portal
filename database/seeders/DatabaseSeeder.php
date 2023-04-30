<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Communication\CompanyCommunication;
use App\Models\Communication\ImportantCommunication;
use App\Models\User;
use Database\Factories\Communication\ImportantCommunicationFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(100)->create();
         ImportantCommunication::factory(50)->create();
         CompanyCommunication::factory(50)->create();
        $this->call(NoticeGenreSeed::class);
        $this->call(MenuCategorySeed::class);
        $this->call(MenuItemSeed::class);

        // 重要連絡事項テストデータ
//        $this->call(ImportantCommunicationSeeder::class);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
