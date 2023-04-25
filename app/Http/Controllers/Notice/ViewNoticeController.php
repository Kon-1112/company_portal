<?php

namespace App\Http\Controllers\Notice;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ViewNoticeController extends Controller
{

    // 社内連絡を表示する
    public function internalCommunicationView(): Response
    {
        return Inertia::render('Notice/Home', [
            'status'        => session('status'),
        ]);
    }

    // 重要連絡を表示する
    public function importantCommunicationView(): Response
    {
        return Inertia::render('Notice/Home', [
            'status' => session('status'),
        ]);
    }
}
