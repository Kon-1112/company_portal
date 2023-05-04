<?php

namespace App\Repository\Communications;

use App\Models\Communication\CompanyCommunication;

class CompanyCommunicationRepository
{
    /**
     * 会社連絡を指定の件数取得する
     * ページネーション
     */
    public function getCompanyCommunications(int $count)
    {
        return CompanyCommunication::orderBy('cc_updated_at', 'desc')
            ->join('t_users', 't_company_communications.cc_updated_by_email', '=', 't_users.email')
            ->paginate($count);
    }
}
