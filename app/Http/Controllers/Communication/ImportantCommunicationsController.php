<?php

namespace App\Http\Controllers\Communication;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportantCommunicationRequest;
use App\Service\Communications\ImportantCommunicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ImportantCommunicationsController extends Controller
{
    /**
     * @var ImportantCommunicationService $importantCommunicationService
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
        return Inertia::render('Communication/ImportantCommunication', [
            'status' => session('status'),
            'items'  => $this->importantCommunicationService->getImportantCommunications(15),
        ]);
    }

    /**
     * 重要連絡を既読にする
     * @param Request $request
     * @return JsonResponse
     */
    public function read(Request $request): JsonResponse
    {
        $this->importantCommunicationService->readImportantCommunication($request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'ic_id' => ['required', 'numeric', 'min:1'],
            'status' => ['required', 'numeric', 'min:0', 'max:1'],
        ]));
        return response()->json([], ResponseAlias::HTTP_OK);
    }

    /**
     * 重要連絡を検索する
     * @param Request $request
     * @return
     */
    public function search(Request $request)
    {
        return response()->json([
            $this->importantCommunicationService->searchImportantCommunications($request->all(), 15),
        ], ResponseAlias::HTTP_OK);
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
        return Inertia::render('Communication/ImportantCommunication', [
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
