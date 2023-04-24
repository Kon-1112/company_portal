<?php

namespace Database\Seeders;

use App\Models\NoticeGenre;
use Illuminate\Database\Seeder;

class NoticeGenreSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NoticeGenre::create([
            'ng_name' => '重要連絡',
            'ng_description' => '重要な連絡をお知らせします。',
            'ng_level' => 1,
            'ng_color' => '#ff0000',
            'ng_read_flag' => true,
        ]);
        NoticeGenre::create([
            'ng_name' => '社内連絡',
            'ng_description' => '社内の連絡をお知らせします。',
            'ng_level' => 2,
            'ng_color' => '#00b321',
            'ng_read_flag' => false,
        ]);
    }
}
