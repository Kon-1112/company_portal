<?php

namespace App\Service\Communications;

use App\Repository\Communications\ImportantCommunicationRepository;

class ImportantCommunicationService
{

    /**
     * @var ImportantCommunicationRepository $importantCommunicationRepository 重要連絡リポジトリ
     */
    private ImportantCommunicationRepository $importantCommunicationRepository;

    /**
     * コンスタンタ
     * @param ImportantCommunicationRepository $importantCommunicationRepository 重要連絡リポジトリ
     */
    public function __construct(ImportantCommunicationRepository $importantCommunicationRepository)
    {
        $this->importantCommunicationRepository = $importantCommunicationRepository;
    }

    /**
     * 重要連絡を指定の件数取得する
     * @param int $count 件数
     * @return object
     */
    public function getImportantCommunications(int $count): object
    {
        return $this->importantCommunicationRepository->getImportantCommunications($count);
    }

    /**
     * 重要連絡を取得する
     * @param int $id 重要連絡ID
     * @return object
     */
    public function getImportantCommunication(int $id): object
    {
        return $this->importantCommunicationRepository->getImportantCommunication($id);
    }

    /**
     * 重要連絡を作成する
     * @param array $data 重要連絡データ
     * @return object
     */
    public function createImportantCommunication(array $data): object
    {
        return $this->importantCommunicationRepository->createImportantCommunication($data);
    }

    /**
     * 重要連絡を更新する
     * @param int $id 重要連絡ID
     * @param array $data 重要連絡データ
     * @return object
     */
    public function updateImportantCommunication(int $id, array $data): object
    {
        return $this->importantCommunicationRepository->updateImportantCommunication($id, $data);
    }

    /**
     * 重要連絡を削除する
     * @param int $id 重要連絡ID
     * @return object
     */
    public function deleteImportantCommunication(int $id): object
    {
        return $this->importantCommunicationRepository->deleteImportantCommunication($id);
    }
}
