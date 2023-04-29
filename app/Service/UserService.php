<?php

namespace App\Service;

use App\Models\User;
use App\Repository\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class UserService
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * コンストラクタ
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * ユーザー一覧を取得する
     * @return Collection
     */
    public function getUsers(): Collection
    {
        return $this->userRepository->getUsers();
    }

    /**
     * メーあるアドレスからユーザーを取得する
     * @param string $email
     * @return User|null
     */
    public function getUserByEmail(string $email): ?User
    {
        return $this->userRepository->getByEmail($email);
    }

    /**
     * ユーザーIDからユーザーを取得する
     * @param int $id
     * @return User
     */
    public function getUserById(int $id): User
    {
        return $this->userRepository->getUserById($id);
    }

    /**
     * ユーザーを作成する
     * @param array $data
     * @return User|null
     */
    public function createUser(array $data): ?User
    {
        // バリデーションルールの定義
        $rules = [
            'email' => [
                'required',
                'email',
                Rule::unique('t_users')
            ],
            'password' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ];
        // バリデーションの実行
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        // パスワードのハッシュ化
        $data['password'] = Hash::make($data['password']);

        return $this->userRepository->create($data);
    }

    /**
     * ユーザーを更新する
     * @param int $id
     * @param array $data
     * @return void
     */
    public function updateUser(int $id, array $data): void
    {
        $this->userRepository->updateUser($id, $data);
    }

    /**
     * ユーザーを削除する
     * @param int $id
     * @return void
     */
    public function deleteUser(int $id): void
    {
        $this->userRepository->deleteUser($id);
    }

    /**
     * ユーザーのアバターをアップロードする
     * @param User $user ユーザー
     * @param UploadedFile $imageFile アップロードファイル
     * @return void
     */
    public function uploadAvatar(User $user, UploadedFile $imageFile): void
    {
        $this->deleteAvatar($user);
        $this->userRepository->uploadAvatar($user, $imageFile);
    }

    /**
     * ユーザーのアバターを削除する
     * @param User $user ユーザー
     * @return void
     */
    public function deleteAvatar(User $user): void
    {
        $this->userRepository->deleteAvatar($user);
    }
}
