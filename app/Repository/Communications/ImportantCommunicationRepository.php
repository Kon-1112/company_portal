<?php

namespace App\Repository\Communications;

use App\Models\Communication\ImportantCommunication;
use App\Models\Communication\ImportantCommunicationReadFlg;
use App\Models\User;

class ImportantCommunicationRepository
{
    /**
     * 重要連絡を指定の件数取得する
     * ページネーション
     */
    public function getImportantCommunications(int $count)
    {
        return ImportantCommunication::orderBy('ic_updated_at', 'desc')
            ->join('t_users', 't_important_communications.ic_created_by_email', '=', 't_users.email')
            ->leftJoin('t_important_communication_read_flg', function ($join) {
                $join->on('ic_id', '=', 'icrf_ic_id')
                    ->where('icrf_email', '=', auth()->user()->email);
            })
            ->paginate($count);
    }

    /**
     * 既読テーブルにデータを追加する
     * @param array $data
     * @return mixed
     */
    public function readImportantCommunication(array $data): mixed
    {
        return ImportantCommunicationReadFlg::create([
            'icrf_ic_id'  => $data['ic_id'],
            'icrf_email'  => $data['email'],
            'icrf_status' => $data['status'],
            'icrf_read_at'=> now(),
        ]);
    }

    /**
     * 既読テーブルからデータを削除する
     * @param array $data
     * @return void
     */
    public function unreadImportantCommunication(array $data): void
    {
        ImportantCommunicationReadFlg::where('icrf_ic_id', $data['ic_id'])
            ->where('icrf_email', $data['email'])
            ->delete();
    }

    /**
     *
     * @param array $data
     * @return bool
     */
    public function isReadImportantCommunication(array $data): bool
    {
        return ImportantCommunicationReadFlg::where('icrf_ic_id', $data['ic_id'])
            ->where('icrf_email', $data['email'])
            ->where('icrf_status', $data['status'])
            ->exists();
    }

    /**
     * 重要連絡を検索する
     * @param array $data 検索条件
     * @param int $count
     * @return object
     */
    public function searchImportantCommunications(array $data, int $count): object
    {
        $filteredUsers = $data['selectedUsers'] ?? [];
        $filteredUserEmails = array_map(function ($user) {
            return $user['email'];
        }, $filteredUsers);

        $filteredCategories = $data['selectedCategories'] ?? [];
        $filteredCategoryIds = array_map(function ($category) {
            return $category['id'];
        }, $filteredCategories);

        $filteredStartDate = $data['selectedStartDate'] ?? '';
        $filteredEndDate = $data['selectedEndDate'] ?? '';
        $filteredReadFlag = $data['selectedReadFlag'] ?? '';

        $email = $data['email'] ?? '';

        return ImportantCommunication::orderBy('ic_updated_at', 'desc')
            ->join('t_users', 't_important_communications.ic_created_by_email', '=', 't_users.email')
            ->leftJoin('t_important_communication_read_flg', function ($join) use ($email) {
                $join->on('ic_id', '=', 'icrf_ic_id')
                    ->where('icrf_email', '=', $email)
                    ->when(empty($filteredReadFlag), function ($query) {
                        return $query->where('icrf_status', '=', 1);
                    });
            })
            ->when(!empty($filteredUserEmails), function ($query) use ($filteredUserEmails) {
                return $query->whereIn('ic_created_by_email', $filteredUserEmails);
            })
            ->when(!empty($filteredCategoryIds), function ($query) use ($filteredCategoryIds) {
                return $query->whereIn('ic_category_id', $filteredCategoryIds);
            })
            ->when(!empty($filteredStartDate), function ($query) use ($filteredStartDate) {
                return $query->where('ic_created_at', '>=', $filteredStartDate);
            })
            ->when(!empty($filteredEndDate), function ($query) use ($filteredEndDate) {
                return $query->where('ic_created_at', '<=', $filteredEndDate);
            })
            ->paginate($count);
    }

    /**
     * 重要連絡を取得する
     */
    public function getImportantCommunication(int $id)
    {
        return ImportantCommunication::find($id);
    }

    /**
     * 重要連絡を作成する
     */
    public function createImportantCommunication(array $data)
    {
        return ImportantCommunication::create($data);
    }

    /**
     * 重要連絡を更新する
     */
    public function updateImportantCommunication(int $id, array $data)
    {
        return ImportantCommunication::find($id)->update($data);
    }

    /**
     * 重要連絡を削除する
     */
    public function deleteImportantCommunication(int $id)
    {
        return ImportantCommunication::find($id)->delete();
    }
}
