<?php

namespace App\Http\Middleware;

use App\Service\SideMenu\MenuCategoryService;
use App\Service\SideMenu\MenuItemService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * @var MenuItemService $menuItemService メニューアイテムサービス
     */
    private MenuItemService $menuItemService;

    /**
     * @var MenuCategoryService $menuCategoryService メニューカテゴリーサービス
     */
    private MenuCategoryService $menuCategoryService;

    /**
     * コンストラクタ
     * @param MenuItemService $menuItemService
     * @param MenuCategoryService $menuCategoryService
     */
    public function __construct(
        MenuItemService $menuItemService,
        MenuCategoryService $menuCategoryService
    )
    {
        $this->menuItemService = $menuItemService;
        $this->menuCategoryService = $menuCategoryService;
    }

    /**
     * @var string $rootView ルートビュー
     */
    protected $rootView = 'app';

    /**
     * バージョンを取得する
     * @param Request $request
     * @return string|null
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * 共有データを取得する
     * @param Request $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'menuItemList' => fn () => $this->menuItemService->getMenuItems(),
            'menuCategoryList' => fn () => $this->menuCategoryService->getMenuCategories(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
