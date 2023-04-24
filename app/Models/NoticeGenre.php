<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * お知らせジャンルモデル
 */
class NoticeGenre extends Model
{

    use HasFactory;

    /**
     * @var string テーブル名
     */
    protected $table = 'notice_genre';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'ng_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'ng_id',
        'ng_name',
        'ng_description',
        'ng_level',
        'ng_color',
        'ng_read_flag',
        'ng_delete_flag',
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
        'ng_id'             => 'string',
        'ng_name'           => 'string',
        'ng_description'    => 'string',
        'ng_level'          => 'integer',
        'ng_color'          => 'string',
        'ng_read_flag'      => 'boolean',
        'ng_delete_flag'    => 'boolean',
    ];

    /**
     * @var string[] ガードする属性
     */
    protected $guarded = [
        'ng_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
