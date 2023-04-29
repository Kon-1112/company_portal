<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

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

    /**
     * ユーザーのアバターをアップロードする
     * storage/app/public/avatars/に画像ファイルを保存する
     * @param User $user
     * @param UploadedFile $imageFile
     */
    public function uploadAvatar(User $user, UploadedFile $imageFile): void
    {
        $fileName = uniqid() . '.' . $imageFile->getClientOriginalExtension();
        $imageFile->storeAs('public/avatars', $fileName);

        $user->avatar_url = config('app.url') . '/storage/avatars/' . $fileName;
        $user->save();
    }

    /**
     * ユーザーのアバターを削除する
     * @param User $user
     */
    public function deleteAvatar(User $user): void
    {
        if (empty($fileName = basename($user->avatar_url))) {
            return;
        }
        if (file_exists($filePath = storage_path('app/public/avatars/' . $fileName))) {
            unlink($filePath);
        }
        $user->avatar_url = null;
        $user->save();
    }
}
