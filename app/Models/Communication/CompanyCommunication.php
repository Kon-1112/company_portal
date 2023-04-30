<?php

namespace App\Models\Communication;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 社内連絡事項
 */
class CompanyCommunication extends Model
{

    use HasFactory;

    /**
     * @var string 作成日時
     */
    const CREATED_AT = 'cc_created_at';

    /**
     * @var string 更新日時
     */
    const UPDATED_AT = 'cc_updated_at';

    /**
     * @var string テーブル名
     */
    protected $table = 't_company_communications';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'cc_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'cc_id',
        'cc_title',
        'cc_content',
        'cc_created_by_email',
        'cc_updated_by_email',
        'cc_deleted_by_email',
        'cc_delete_flag',
        'cc_image_url',
        'cc_target_json',
        'cc_draft_flag',
        'cc_created_at',
        'cc_updated_at',
        'cc_deleted_at',
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
        'cc_id'                 => 'string',
        'cc_title'              => 'string',
        'cc_content'            => 'string',
        'cc_created_by_email'   => 'string',
        'cc_updated_by_email'   => 'string',
        'cc_deleted_by_email'   => 'string',
        'cc_delete_flag'        => 'boolean',
        'cc_image_url'          => 'string',
        'cc_target_json'        => 'string',
        'cc_draft_flag'         => 'boolean',
        'cc_created_at'         => 'datetime',
        'cc_updated_at'         => 'datetime',
        'cc_deleted_at'         => 'datetime',
    ];
}
