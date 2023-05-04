<?php

namespace App\Service\Communications;

use App\Repository\Communications\ImportantCommunicationRepository;

class ImportantCommunicationService
{
    /**
     * @var ImportantCommunicationRepository $importantRepository
     */
    private ImportantCommunicationRepository $importantRepository;

    /**
     * コンスタンタ
     * @param ImportantCommunicationRepository $importantCommunicationRepository 重要連絡リポジトリ
     */
    public function __construct(ImportantCommunicationRepository $importantCommunicationRepository)
    {
        $this->importantRepository = $importantCommunicationRepository;
    }

    /**
     * 重要連絡を指定の件数取得する
     * @param int $count 件数
     * @return object
     */
    public function getImportantCommunications(int $count): object
    {
        return $this->importantRepository->getImportantCommunications($count);
    }

    /**
     * 指定の重要連絡を既読にする
     * @param array $data
     * @return mixed|void
     */
    public function readImportantCommunication(array $data)
    {
        switch ($data['status']) {
            case 1:
                if (!$this->importantRepository->isReadImportantCommunication($data)) {
                    return $this->importantRepository->readImportantCommunication($data);
                }
                break;
            case 0:
                $this->importantRepository->unreadImportantCommunication($data);
                break;
        }
    }

    /**
     * 重要連絡を検索する
     * @param array $data
     * @param int $count
     * @return object
     */
    public function searchImportantCommunications(array $data, int $count): object
    {
        return $this->importantRepository->searchImportantCommunications($data, $count);
    }


    /**
     * 重要連絡を取得する
     * @param int $id 重要連絡ID
     * @return object
     */
    public function getImportantCommunication(int $id): object
    {
        return $this->importantRepository->getImportantCommunication($id);
    }

    /**
     * 重要連絡を作成する
     * @param array $data 重要連絡データ
     * @return object
     */
    public function createImportantCommunication(array $data): object
    {
        return $this->importantRepository->createImportantCommunication($data);
    }

    /**
     * 重要連絡を更新する
     * @param int $id 重要連絡ID
     * @param array $data 重要連絡データ
     * @return object
     */
    public function updateImportantCommunication(int $id, array $data): object
    {
        return $this->importantRepository->updateImportantCommunication($id, $data);
    }

    /**
     * 重要連絡を削除する
     * @param int $id 重要連絡ID
     * @return object
     */
    public function deleteImportantCommunication(int $id): object
    {
        return $this->importantRepository->deleteImportantCommunication($id);
    }
}
