<?php

namespace App\Http\Controllers\Communication;

use App\Http\Controllers\Controller;
use App\Service\Communications\CompanyCommunicationService;
use Inertia\Inertia;
use Inertia\Response;

class CompanyCommunicationController extends Controller
{
    /**
     * @var CompanyCommunicationService $companyCommunicationService
     */
    private CompanyCommunicationService $companyCommunicationService;

    /**
     * コンストラクタ
     * @param CompanyCommunicationService $companyCommunicationService
     */
    public function __construct(CompanyCommunicationService $companyCommunicationService)
    {
        $this->companyCommunicationService = $companyCommunicationService;
    }

    /**
     * 会社連絡を表示する
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Communication/CompanyCommunication', [
            'status' => session('status'),
            'items'  => $this->companyCommunicationService->getCompanyCommunications(15),
        ]);
    }
}
