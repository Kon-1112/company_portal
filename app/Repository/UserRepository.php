<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    /**
     * @var User
     */
    protected User $model;

    /**
     * コンストラクタ
     * @param User $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * ユーザー一覧を取得する
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->model->all();
    }

    /**
     * ユーザーを取得する
     * @param $id
     * @return User
     */
    public function getById($id): User
    {
        return $this->model->find($id);
    }

    /**
     * メーあるアドレスからユーザーを取得する
     * @param string $email
     * @return User|null
     */
    public function getByEmail(string $email): ?User
    {
        return $this->model->where('email', '=', $email)->first();
    }

    /**
     * ユーザーを作成する
     * @param array $data
     * @return User|null
     */
    public function create(array $data): ?User
    {
        return $this->model->create($data);
    }

    /**
     * ユーザーを更新する
     * @param $id
     * @param array $data
     * @return bool
     */
    public function update($id, array $data): bool
    {
        $record = $this->getById($id);
        return $record->update($data);
    }

    /**
     * ユーザーを削除する
     * @param $id
     * @return bool
     */
    public function delete($id): bool
    {
        $record = $this->getById($id);
        return $record->delete();
    }

    /**
     * ユーザーを検索する
     * @param array $data
     * @return Collection
     */
    public function search(array $data): Collection
    {
        return $this->model->where('id', 'like', "%{$data['id']}%")
            ->where('email', 'like', "%{$data['email']}%")
            ->get();
    }
}
