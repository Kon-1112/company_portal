<?php

namespace Database\Seeders;

use App\Models\MenuCategory;
use Illuminate\Database\Seeder;

class MenuCategorySeed extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run(): void
    {
        MenuCategory::class::create([
            'mc_name' => 'お知らせ',
            'mc_description' => 'お知らせメニューのカテゴリーです。',
            'mc_order' => 1,
            'mc_created_email' => 'test@example.com',
            'mc_updated_email' => 'test@example.com',
            'mc_deleted_email' => 'test@example.com',
        ]);
        MenuCategory::class::create([
            'mc_name' => 'メニュー',
            'mc_description' => 'メニューのカテゴリーです。',
            'mc_order' => 2,
            'mc_created_email' => 'test@example.com',
            'mc_updated_email' => 'test@example.com',
            'mc_deleted_email' => 'test@example.com',
        ]);
        MenuCategory::class::create([
            'mc_name' => '各種申請',
            'mc_description' => '各種申請のカテゴリーです。',
            'mc_order' => 3,
            'mc_created_email' => 'test@example.com',
            'mc_updated_email' => 'test@example.com',
            'mc_deleted_email' => 'test@example.com',
        ]);
    }
}
