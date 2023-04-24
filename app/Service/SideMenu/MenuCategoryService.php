<?php

namespace App\Service\SideMenu;

use App\Models\MenuCategory;
use App\Repository\SideMenu\MenuCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class MenuCategoryService
{
    /**
     * @var MenuCategoryRepository
     */
    private MenuCategoryRepository $menuCategoryRepository;

    /**
     * コンストラクタ
     * @param MenuCategoryRepository $menuCategoryRepository
     */
    public function __construct(MenuCategoryRepository $menuCategoryRepository)
    {
        $this->menuCategoryRepository = $menuCategoryRepository;
    }

    /**
     * メニュー一覧を取得する
     * @return Collection
     */
    public function getMenuCategories(): Collection
    {
        return $this->menuCategoryRepository->getAll();
    }

    /**
     * メニューを取得する
     * @param $id
     * @return MenuCategory
     */
    public function getMenuCategoryById($id): MenuCategory
    {
        return $this->menuCategoryRepository->getById($id);
    }

    /**
     * メニューを作成する
     * @param array $data
     * @return MenuCategory|null
     */
    public function createMenuCategory(array $data): ?MenuCategory
    {
        return $this->menuCategoryRepository->create($data);
    }

    /**
     * メニューを更新する
     * @param array $data
     * @param int $id
     */
    public function updateMenuCategory(array $data, int $id): void
    {
        $this->menuCategoryRepository->update($data, $id);
    }

    /**
     * メニューを削除する
     * @param int $id
     */
    public function deleteMenuCategory(int $id): void
    {
        $this->menuCategoryRepository->delete($id);
    }
}
