<?php

namespace App\Http\Controllers\Communication;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportantCommunicationRequest;
use App\Service\Communications\ImportantCommunicationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportantCommunicationsController extends Controller
{
    /**
     * @var ImportantCommunicationService $importantCommunicationService 重要連絡サービス
     */
    private ImportantCommunicationService $importantCommunicationService;

    /**
     * コンストラクタ
     * @param ImportantCommunicationService $importantCommunicationService
     */
    public function __construct(ImportantCommunicationService $importantCommunicationService)
    {
        $this->importantCommunicationService = $importantCommunicationService;
    }

    /**
     * 重要連絡を表示する
     * @return Response
     */
    public function index(): Response
    {
        $importantCommunications = $this->importantCommunicationService->getImportantCommunications(10);
        return Inertia::render('Communication/ImportantCommunication', [
            'status'        => session('status'),
            'items'         => $importantCommunications,
        ]);
    }

    /**
     * 重要連絡を作成する
     * @param ImportantCommunicationRequest $request
     * @return RedirectResponse
     */
    public function create(ImportantCommunicationRequest $request): RedirectResponse
    {
        $this->importantCommunicationService->create($request->user(), $request->validated());
        return Redirect::route('importantCommunication.edit');
    }

    /**
     * 重要連絡を編集する
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Communication/ImportantCommnucation', [
            'status' => session('status'),
        ]);
    }

    /**
     * 重要連絡を更新する
     * @param ImportantCommunicationRequest $request
     * @return RedirectResponse
     */
    public function update(ImportantCommunicationRequest $request): RedirectResponse
    {
        $this->importantCommunicationService->update($request->user(), $request->validated());
        return Redirect::route('importantCommunication.edit');
    }
}
