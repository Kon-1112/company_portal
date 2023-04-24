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
            'mi_url' => '/notice',
            'mi_route' => 'important_notice.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 1,
            'mi_name' => '社内連絡',
            'mi_order' => 2,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '/notice',
            'mi_route' => 'internal_notice.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
        MenuItem::create([
            'mi_mc_id' => 2,
            'mi_name' => '重要連絡',
            'mi_order' => 1,
            'mi_icon' => 'fa-solid fa-person',
            'mi_url' => '/notice',
            'mi_route' => 'notice.view',
            'mi_color' => '#ff0000',
            'mi_created_email' => 'test@example.com',
            'mi_updated_email' => 'test@example.com',
        ]);
    }
}
