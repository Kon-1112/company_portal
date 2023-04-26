<?php

namespace App\Service\SideMenu;

use App\Models\MenuItem;
use App\Repository\SideMenu\MenuItemRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * メニューアイテムサービス
 */
class MenuItemService
{
    /**
     * @var MenuItemRepository
     */
    private MenuItemRepository $menuItemRepository;

    /**
     * コンストラクタ
     * @param MenuItemRepository $menuItemRepository
     */
    public function __construct(MenuItemRepository $menuItemRepository)
    {
        $this->menuItemRepository = $menuItemRepository;
    }

    /**
     * メニュー一覧を取得する
     * @return Collection
     */
    public function getMenuItems(): Collection
    {
        return $this->menuItemRepository->getAll();
    }

    /**
     * メニューを取得する
     * @param $id
     * @return MenuItem
     */
    public function getMenuItemById($id): MenuItem
    {
        return $this->menuItemRepository->getById($id);
    }

    /**
     * メニューを作成する
     * @param array $data
     * @return MenuItem|null
     */
    public function createMenuItem(array $data): ?MenuItem
    {
        return $this->menuItemRepository->create($data);
    }

    /**
     * メニューを更新する
     * @param array $data
     * @param int $id
     * @return MenuItem|null
     */
    public function updateMenuItem(array $data, int $id): ?MenuItem
    {
        return $this->menuItemRepository->update($data, $id);
    }

    /**
     * メニューを削除する
     * @param int $id
     * @return bool
     */
    public function deleteMenuItem(int $id): bool
    {
        return $this->menuItemRepository->delete($id);
    }
}
