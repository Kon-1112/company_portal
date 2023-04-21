<?php

namespace App\Repository;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Collection;

class AdminRepository
{
    protected Admin $admin;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    /**
     * 管理者一覧を取得する
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->admin->all();
    }

    /**
     * 管理者を取得する
     * @param $id
     * @return Admin
     */
    public function getById($id): Admin
    {
        return $this->admin->find($id);
    }

    /**
     * 管理者を作成する
     * @param array $data
     * @return Admin
     */
    public function create(array $data): Admin
    {
        return $this->admin->create($data);
    }

    /**
     * 管理者を更新する
     * @param $id
     * @param array $data
     * @return bool
     */
    public function update($id, array $data): bool
    {
        return $this->admin->find($id)->update($data);
    }

    /**
     * 管理者を削除する
     * @param $id
     * @return bool
     */
    public function delete($id): bool
    {
        return $this->admin->find($id)->delete();
    }

    /**
     * 管理者を検索する
     * @param array $data
     * @return Collection
     */
    public function search(array $data): Collection
    {
        return $this->admin->where('a_first_name', 'like', '%' . $data['a_first_name'] . '%')
            ->where('a_last_name', 'like', '%' . $data['a_last_name'] . '%')
            ->where('a_email', 'like', '%' . $data['a_email'] . '%')
            ->get();
    }
}
