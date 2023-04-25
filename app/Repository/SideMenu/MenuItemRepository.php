<?php

namespace App\Repository\SideMenu;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Collection;

/**
 * メニューのリポジトリクラス
 */
class MenuItemRepository
{
    /**
     * @var MenuItem
     */
    protected MenuItem $model;

    /**
     * コンストラクタ
     * @param MenuItem $model
     */
    public function __construct(MenuItem $model)
    {
        $this->model = $model;
    }

    /**
     * メニュー一覧を取得する
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->model->orderBy('mi_order')->get();
    }

    /**
     * メニューを取得する
     * @param $id
     * @return MenuItem
     */
    public function getById($id): MenuItem
    {
        return $this->model->find($id);
    }

    /**
     * メニューを作成する
     * @param array $data
     * @return MenuItem|null
     */
    public function create(array $data): ?MenuItem
    {
        return $this->model->create($data);
    }

    /**
     * メニューを更新する
     * @param array $data
     * @param int $id
     * @return MenuItem|null
     */
    public function update(array $data, int $id): ?MenuItem
    {
        $menu = $this->model->find($id);
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
        return $this->model->find($id)->delete();
    }
}
