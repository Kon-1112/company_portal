<?php

namespace App\Repository\SideMenu;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Collection;

/**
 * メニューのリポジトリクラス
 */
class MenuCategoryRepository
{
    /**
     * @var MenuCategory
     */
    protected MenuCategory $model;

    /**
     * コンストラクタ
     * @param MenuCategory $model
     */
    public function __construct(MenuCategory $model)
    {
        $this->model = $model;
    }

    /**
     * メニュー一覧を取得する
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->model->orderBy('mc_order')->get();
    }

    /**
     * メニューを取得する
     * @param $id
     * @return MenuCategory
     */
    public function getById($id): MenuCategory
    {
        return $this->model->find($id);
    }

    /**
     * メニューを作成する
     * @param array $data
     * @return MenuCategory|null
     */
    public function create(array $data): ?MenuCategory
    {
        return $this->model->create($data);
    }

    /**
     * メニューを更新する
     * @param array $data
     * @param int $id
     * @return MenuCategory|null
     */
    public function update(array $data, int $id): ?MenuCategory
    {
        $menu = $this->getById($id);
        $menu->update($data);
        return $menu;
    }

    /**
     * メニューを削除する
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id): ?bool
    {
        return $this->getById($id)->delete();
    }
}
