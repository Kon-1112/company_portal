<?php

namespace App\Repository\Communications;

use App\Models\Communication\ImportantCommunication;
use App\Models\Communication\ImportantCommunicationReadFlg;

class ImportantCommunicationRepository
{
    /**
     * 重要連絡を検索する
     * @param string $email ログインユーザーのメールアドレス
     * @param string $searchTitle タイトル検索
     * @param string $searchContent 内容検索
     * @param array $filteredUserEmails フィルターされたユーザーのメールアドレス
     * @param array $filteredCategoryIds フィルターされたカテゴリーのID
     * @param string $filteredStartDate フィルターされた開始日
     * @param string $filteredEndDate フィルターされた終了日
     * @param string $sortColumn
     * @param string $sortOrderBy
     * @return object
     */
    public function store(
        string $email, string $searchTitle, string $searchContent,
        array $filteredUserEmails, array $filteredCategoryIds,
        string $filteredStartDate, string $filteredEndDate,
        string $sortColumn, string $sortOrderBy
    ): object
    {
        return ImportantCommunication::join('t_users', 't_important_communications.ic_created_by_email', '=', 't_users.email')
            ->where('ic_deleted_flag', '=', false)
            ->leftJoin('t_important_communication_read_flg', function ($join) use ($email) {
                $join->on('ic_id', '=', 'icrf_ic_id')
                    ->where('icrf_email', '=', $email);
            })
            ->where(function ($query) use ($searchTitle) {
                return $query->where('ic_title', 'like', "%$searchTitle%");
            })
            ->where(function ($query) use ($searchContent) {
                return $query->where('ic_content', 'like', "%$searchContent%");
            })
            ->when(!empty($filteredUserEmails), function ($query) use ($filteredUserEmails) {
                return $query->whereIn('ic_created_by_email', $filteredUserEmails);
            })
            ->when(!empty($filteredCategoryIds), function ($query) use ($filteredCategoryIds) {
                return $query->whereIn('ic_category_id', $filteredCategoryIds);
            })
            ->when(!empty($filteredStartDate), function ($query) use ($filteredStartDate) {
                return $query->where('ic_deadline_at', '>=', $filteredStartDate);
            })
            ->when(!empty($filteredEndDate), function ($query) use ($filteredEndDate) {
                return $query->where('ic_deadline_at', '<=', $filteredEndDate);
            })
            ->when(!empty($sortColumn), function ($query) use ($sortColumn, $sortOrderBy) {
                return $query->orderBy($sortColumn, $sortOrderBy);
            })
            ->paginate(20);
    }

    /**
     * 既読テーブルにデータを追加する
     * @param array $data
     * @return mixed
     */
    public function read(array $data): mixed
    {
        return ImportantCommunicationReadFlg::create([
            'icrf_ic_id'  => $data['ic_id'],
            'icrf_email'  => $data['email'],
            'icrf_read_at'=> now(),
        ]);
    }

    /**
     * 既読テーブルからデータを削除する
     * @param array $data
     * @return void
     */
    public function unread(array $data): void
    {
        ImportantCommunicationReadFlg::where('icrf_ic_id', $data['ic_id'])
            ->where('icrf_email', $data['email'])
            ->delete();
    }

    /**
     * 既読テーブルにデータが存在するか確認する
     * @param array $data
     * @return bool
     */
    public function isRead(array $data): bool
    {
        return ImportantCommunicationReadFlg::where('icrf_ic_id', $data['ic_id'])
            ->where('icrf_email', $data['email'])
            ->exists();
    }

    /**
     * 重要連絡を作成する
     * @param array $data 作成データ
     * @return object
     */
    public function createImportantCommunication(array $data): object
    {
        return ImportantCommunication::create($data);
    }

    /**
     * 重要連絡を更新する
     * @param int $id 重要連絡ID
     * @param array $data 更新データ
     * @return bool
     */
    public function updateImportantCommunication(int $id, array $data): bool
    {
        return ImportantCommunication::find($id)->update($data);
    }

    /**
     * 削除フラグを立てる
     * @param string $email ログインユーザーのメールアドレス
     * @param int $id 重要連絡ID
     * @return void
     */
    public function destroy(string $email, int $id): void
    {
        ImportantCommunication::find($id)->update([
            'ic_deleted_flag'       => true,
            'ic_deleted_by_email'   => $email,
            'ic_deleted_at'         => now(),
        ]);
    }
}
