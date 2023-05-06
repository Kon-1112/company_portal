<?php

namespace App\Service\Communications;

use App\Repository\Communications\ImportantCommunicationRepository;

class ImportantCommunicationService
{
    private ImportantCommunicationRepository $importantRepository;

    /**
     * コンスタンタ
     * @param ImportantCommunicationRepository $importantRepository 重要連絡リポジトリ
     */
    public function __construct(ImportantCommunicationRepository $importantRepository)
    {
        $this->importantRepository = $importantRepository;
    }

    /**
     * 重要連絡を検索する
     * @param array $data
     * @return object
     */
    public function store(array $data): object
    {
        $email = $data['email'] ?? '';

        $searchTitle = $data['searchTitle'] ?? '';
        $searchContent = $data['searchContent'] ?? '';

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

        $sortColumn = $data['column'] ?? 'ic_created_at';
        $sortOrderBy = $data['orderBy'] ?? 'desc';

        return $this->importantRepository->store(
            $email,
            $searchTitle,
            $searchContent,
            $filteredUserEmails,
            $filteredCategoryIds,
            $filteredStartDate,
            $filteredEndDate,
            $sortColumn,
            $sortOrderBy,
        );
    }

    /**
     * 指定の重要連絡を既読にする
     * @param array $data
     * @return mixed|void
     */
    public function read(array $data)
    {
        switch ($data['status']) {
            case 1:
                if (!$this->importantRepository->isRead($data)) {
                    return $this->importantRepository->read($data);
                }
                break;
            case 0:
                $this->importantRepository->unread($data);
                break;
        }
    }

    /**
     * 重要連絡を削除する
     * @param array $data
     * @return void
     */
    public function destroy(array $data): void
    {
        $email = $data['email'];
        $id = $data['ic_id'];
        $this->importantRepository->destroy($email, $id);
    }
}
