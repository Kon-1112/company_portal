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
    private ImportantCommunicationService $importantService;

    /**
     * コンストラクタ
     * @param ImportantCommunicationService $importantCommunicationService
     */
    public function __construct(ImportantCommunicationService $importantCommunicationService)
    {
        $this->importantService = $importantCommunicationService;
    }

    /**
     * 重要連絡を表示する
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Communication/ImportantCommunication', [
            'status' => session('status'),
        ]);
    }

    /**
     * 重要連絡を検索する
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        return response()->json([
            $this->importantService->store($request->all()),
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * 重要連絡を既読にする
     * @param Request $request
     * @return JsonResponse
     */
    public function read(Request $request): JsonResponse
    {
        $this->importantService->read($request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'ic_id' => ['required', 'numeric', 'min:1'],
            'status' => ['required', 'numeric', 'min:0', 'max:1'],
        ]));
        return response()->json([], ResponseAlias::HTTP_OK);
    }

    public function sort(Request $request): JsonResponse
    {
        return response()->json([
            $this->importantService->sort($request->all()),
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * 重要連絡を作成する
     * @param ImportantCommunicationRequest $request
     * @return RedirectResponse
     */
    public function create(ImportantCommunicationRequest $request): RedirectResponse
    {
        $this->importantService->create($request->user(), $request->validated());
        return Redirect::route('importantCommunication.edit');
    }

    /**
     * 重要連絡を更新する
     * @param ImportantCommunicationRequest $request
     * @return RedirectResponse
     */
    public function update(ImportantCommunicationRequest $request): RedirectResponse
    {
        $this->importantService->update($request->user(), $request->validated());
        return Redirect::route('importantCommunication.edit');
    }

    /**
     * 重要連絡を削除する
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        $this->importantService->destroy(
            $request->validate([
                'email' => ['required', 'string', 'email', 'max:255'],
                'ic_id' => ['required', 'numeric', 'min:1'],
            ])
        );
        return response()->json([], ResponseAlias::HTTP_OK);
    }
}
