<?php

namespace App\Service;

use App\Models\NoticeGenre;
use App\Repository\NoticeGenreRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * お知らせジャンルサービス
 */
class NoticeGenreService
{
    /**
     * @var NoticeGenreRepository
     */
    private NoticeGenreRepository $noticeGenreRepository;

    /**
     * コンストラクタ
     * @param NoticeGenreRepository $noticeGenreRepository
     */
    public function __construct(NoticeGenreRepository $noticeGenreRepository)
    {
        $this->noticeGenreRepository = $noticeGenreRepository;
    }

    /**
     * お知らせジャンル一覧を取得する
     * @return Collection
     */
    public function getNoticeGenres(): Collection
    {
        return $this->noticeGenreRepository->getAll();
    }

    /**
     * お知らせジャンルを取得する
     * @param $id
     * @return NoticeGenre
     */
    public function getNoticeGenre($id): NoticeGenre
    {
        return $this->noticeGenreRepository->getById($id);
    }

    /**
     * お知らせジャンルを作成する
     * @param array $data
     * @return NoticeGenre|null
     */
    public function createNoticeGenre(array $data): ?NoticeGenre
    {
        return $this->noticeGenreRepository->create($data);
    }

    /**
     * お知らせジャンルを更新する
     * @param array $data
     * @return NoticeGenre|null
     */
    public function updateNoticeGenre(array $data): ?NoticeGenre
    {
        return $this->noticeGenreRepository->update($data);
    }

    /**
     * お知らせジャンルを削除する
     * @param $id
     * @return bool
     */
    public function deleteNoticeGenre($id): bool
    {
        return $this->noticeGenreRepository->delete($id);
    }
}
