<?php

namespace App\Models\Communication;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 重要連絡事項
 */
class ImportantCommunication extends Model
{

    use HasFactory;

    /**
     * @var string 作成日時
     */
    const CREATED_AT = 'ic_created_at';

    /**
     * @var string 更新日時
     */
    const UPDATED_AT = 'ic_updated_at';

    /**
     * @var string テーブル名
     */
    protected $table = 't_important_communications';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'ic_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'ic_id',
        'ic_title',
        'ic_content',
        'ic_created_by_email',
        'ic_updated_by_email',
        'ic_deleted_by_email',
        'ic_delete_flag',
        'ic_image_url',
        'ic_target_json',
        'ic_draft_flag',
        'ic_created_at',
        'ic_updated_at',
        'ic_deleted_at',
    ];

    /**
     * @var string[] 隠蔽する属性
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * @var string[] 型
     */
    protected $casts = [
        'ic_id'                 => 'string',
        'ic_title'              => 'string',
        'ic_content'            => 'string',
        'ic_created_by_email'   => 'string',
        'ic_updated_by_email'   => 'string',
        'ic_deleted_by_email'   => 'string',
        'ic_delete_flag'        => 'boolean',
        'ic_image_url'          => 'string',
        'ic_target_json'        => 'json',
        'ic_draft_flag'         => 'boolean',
        'ic_created_at'         => 'datetime',
        'ic_updated_at'         => 'datetime',
        'ic_deleted_at'         => 'datetime',
    ];
}
