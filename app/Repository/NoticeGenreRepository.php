<?php

namespace App\Repository;

use App\Models\NoticeGenre;
use Illuminate\Database\Eloquent\Collection;

/**
 * お知らせジャンルリポジトリ
 */
class NoticeGenreRepository
{
    /**
     * @var NoticeGenre
     */
    protected NoticeGenre $model;

    /**
     * コンストラクタ
     * @param NoticeGenre $model
     */
    public function __construct(NoticeGenre $model)
    {
        $this->model = $model;
    }

    /**
     * お知らせジャンル一覧を取得する
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->model->orderBy('ng_level', 'asc')->all();
    }

    /**
     * お知らせジャンルを取得する
     * @param $id
     * @return NoticeGenre
     */
    public function getById($id): NoticeGenre
    {
        return $this->model->find($id);
    }

    /**
     * お知らせジャンルを作成する
     * @param array $data
     * @return NoticeGenre|null
     */
    public function create(array $data): ?NoticeGenre
    {
        return $this->model->create($data);
    }

    /**
     * お知らせジャンルを更新する
     * @param array $data
     * @return NoticeGenre|null
     */
    public function update(array $data): ?NoticeGenre
    {
        $noticeGenre = $this->model->find($data['ng_id']);
        $noticeGenre->fill($data)->save();
        return $noticeGenre;
    }

    /**
     * お知らせジャンルを削除する
     * @param $id
     * @return bool
     */
    public function delete($id): bool
    {
        return $this->model->find($id)->delete();
    }
}
