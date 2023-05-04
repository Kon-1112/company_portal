<?php

namespace App\Service\Communications;

use App\Repository\Communications\CompanyCommunicationRepository;

class CompanyCommunicationService
{
    /**
     * @var CompanyCommunicationRepository $companyCommunicationRepository
     */
    private CompanyCommunicationRepository $companyCommunicationRepository;

    /**
     * コンストラクタ
     * @param CompanyCommunicationRepository $companyCommunicationRepository
     */
    public function __construct(CompanyCommunicationRepository $companyCommunicationRepository)
    {
        $this->companyCommunicationRepository = $companyCommunicationRepository;
    }

    /**
     * 会社連絡を指定の件数取得する
     * @param int $count 件数
     * @return object
     */
    public function getCompanyCommunications(int $count): object
    {
        return $this->companyCommunicationRepository->getCompanyCommunications($count);
    }
}
