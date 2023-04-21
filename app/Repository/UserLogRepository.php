<?php

namespace App\Repository;

use App\Models\UserLogs;

class UserLogRepository
{
    /**
     * ログを作成する
     * @param array $data
     * @return UserLogs
     */
    public function create(array $data): UserLogs
    {
        return UserLogs::create($data);
    }

    /**
     * ログを更新する
     * @param int $limit
     * @return UserLogs
     */
    public function getLatestLogs(int $limit = 10): UserLogs
    {
        return UserLogs::orderBy('ul_login_at', 'desc')->limit($limit)->get();
    }

    /**
     * ユーザーIDからログを取得する
     * @param $userId
     * @param int $limit
     * @return ?UserLogs
     */
    public function getLatestLogsByUserId($userId, int $limit = 10): ?UserLogs
    {
        return UserLogs::where('ul_id', '=', $userId)->orderBy('ul_login_at', 'desc')->limit($limit)->get();
    }
}
