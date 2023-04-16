<?php

namespace App\Service;

use App\Models\Admin;
use App\Repository\AdminRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class AdminService
{
    /**
     * @var AdminRepository
     */
    private AdminRepository $adminRepository;

    /**
     * コンストラクタ
     * @param AdminRepository $adminRepository
     */
    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    /**
     * 管理者一覧を取得する
     * @return Collection
     */
    public function getAdmins(): Collection
    {
        return $this->adminRepository->getAll();
    }

    /**
     * 管理者を取得する
     * @param $id
     * @return Admin
     */
    public function getAdminById($id): Admin
    {
        return $this->adminRepository->getById($id);
    }

    /**
     * 管理者を作成する
     * @param array $data
     * @return Admin
     */
    public function createAdmin(array $data): Admin
    {
        // バリデーションルール
        $rules = [
            'a_first_name' => 'required|string|max:255',
            'a_last_name' => 'required|string|max:255',
            'a_email' => 'required|string|email|max:255|unique:t_admins',
            'a_password' => 'required|string|min:8|confirmed',
        ];

        // バリデーションの実行
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $data['a_password'] = Hash::make($data['a_password']);

        return $this->adminRepository->create($data);
    }

    /**
     * 管理者を更新する
     * @param $id
     * @param array $data
     * @return bool
     */
    public function updateAdmin($id, array $data): bool
    {
        // バリデーションルール
        $rules = [
            'a_first_name' => 'required|string|max:255',
            'a_last_name' => 'required|string|max:255',
            'a_email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('t_admins')->ignore($id),
            ],
            'a_password' => 'nullable|string|min:8|confirmed',
        ];

        // バリデーションの実行
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (isset($data['a_password'])) {
            $data['a_password'] = Hash::make($data['a_password']);
        }

        return $this->adminRepository->update($id, $data);
    }

    /**
     * 管理者を削除する
     * @param $id
     * @return bool
     */
    public function deleteAdmin($id): bool
    {
        return $this->adminRepository->delete($id);
    }

    /**
     * 管理者を検索する
     * @param array $data
     * @return Collection
     */
    public function searchAdmins(array $data): Collection
    {
        // バリデーションルール
        $rules = [
            'a_first_name' => 'nullable|string|max:255',
            'a_last_name' => 'nullable|string|max:255',
            'a_email' => 'nullable|string|email|max:255',
        ];

        // バリデーションの実行
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return $this->adminRepository->search($data);
    }
}
