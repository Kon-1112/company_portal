<?php

namespace App\Repository\Communications;

use App\Models\Communication\ImportantCommunication;

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
