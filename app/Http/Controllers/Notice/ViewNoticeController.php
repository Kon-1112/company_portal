<?php

namespace App\Http\Controllers\Notice;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Service\NoticeGenreService;
use App\Service\SideMenu\MenuCategoryService;
use App\Service\SideMenu\MenuItemService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ViewNoticeController extends Controller
{

    private NoticeGenreService $noticeGenreService;

    private MenuCategoryService $menuCategoryService;

    private MenuItemService $menuItemService;

    /**
     * コンストラクタ
     */
    public function __construct(
        NoticeGenreService $noticeGenreService,
        MenuCategoryService $menuCategoryService,
        MenuItemService $menuItemService
    )
    {
        $this->noticeGenreService = $noticeGenreService;
        $this->menuCategoryService = $menuCategoryService;
        $this->menuItemService = $menuItemService;
    }

    // 社内連絡を表示する
    public function internalCommunicationView(): Response
    {
        return Inertia::render('Notice/Home', [
//            'menuItem'      => $this->menuItemService->getMenuItems(),
//            'menuCategory'  => $this->menuCategoryService->getMenuCategories(),
            'status'        => session('status'),
        ]);
    }

    // 重要連絡を表示する
    public function importantCommunicationView(): Response
    {
        return Inertia::render('Notice/Home', [
//            'menuItem'      => $this->menuItemService->getMenuItems(),
//            'menuCategory'  => $this->menuCategoryService->getMenuCategories(),
            'status' => session('status'),
        ]);
    }
}
