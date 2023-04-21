<?php

namespace App\Service;

use App\Models\UserLogs;
use App\Repository\UserLogRepository;
use Exception;
use Illuminate\Support\Facades\Validator;

class UserLogService
{
    protected UserLogRepository $userLogRepository;

    public function __construct(UserLogRepository $userLogRepository)
    {
        $this->userLogRepository = $userLogRepository;
    }

    /**
     * ログインログを作成する
     * @param array $data
     * @return UserLogs
     * @throws Exception
     */
    public function createUserLog(array $data): UserLogs
    {
//        // バリデーション
//        $validator = Validator::make($data, [
//            'ul_id' => 'required|integer',
//            'ul_ip_address' => 'required|string',
//            'ul_user_agent' => 'required|string',
//            'ul_device' => 'required|string',
//            'ul_browser' => 'required|string',
//            'ul_os' => 'required|string',
//            'ul_login_at' => 'required|date',
//            'ul_logout_at' => 'nullable|date',
//        ]);
//
//        if ($validator->fails()) {
//            throw new Exception($validator->errors()->first());
//        }

        return $this->userLogRepository->create($data);
    }

    /**
     * 最新のログを取得する
     * @param int $limit
     * @return UserLogs
     */
    public function getLatestLogs(int $limit = 10): UserLogs
    {
        return $this->userLogRepository->getLatestLogs($limit);
    }

/**
     * ユーザーIDからログを取得する
     * @param $userId
     * @param int $limit
     * @return UserLogs
     */
    public function getLatestLogsByUserId($userId, int $limit = 10): UserLogs
    {
        return $this->userLogRepository->getLatestLogsByUserId($userId, $limit);
    }
}
