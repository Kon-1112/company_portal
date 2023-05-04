<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    /**
     * @var string 作成日時
     */
    const CREATED_AT = 'd_created_at';

    /**
     * @var string 更新日時
     */
    const UPDATED_AT = 'd_updated_at';

    /**
     * @var string テーブル名
     */
    protected $table = 'm_departments';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'd_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'd_id',
        'd_name',
        'd_name_kana',
        'd_name_short',
        'd_name_short_kana',
        'd_color',
        'd_slack_channel_id',
        'd_slack_channel_name',
        'd_attendance_slack_channel_id',
        'd_attendance_slack_channel_name',
        'd_created_at',
        'd_updated_at',
    ];

    /**
     * @var string[] 隠蔽する属性
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var string[] 日付として扱う属性
     */
    protected $dates = [
        'd_created_at',
        'd_updated_at',
    ];

    /**
     * @var string[] キャストする属性
     */
    protected $casts = [
        'd_id'                              => 'integer',
        'd_name'                            => 'string',
        'd_name_kana'                       => 'string',
        'd_name_short'                      => 'string',
        'd_name_short_kana'                 => 'string',
        'd_color'                           => 'string',
        'd_slack_channel_id'                => 'string',
        'd_slack_channel_name'              => 'string',
        'd_attendance_slack_channel_id'     => 'string',
        'd_attendance_slack_channel_name'   => 'string',
        'd_created_at'                      => 'datetime',
        'd_updated_at'                      => 'datetime',
    ];

    /**
     * @var string[] バリデーションルール
     */
    public static array $rules = [
        'd_id'                              => ['integer', 'min:0', 'max:4294967295'],
        'd_name'                            => ['string', 'max:255'],
        'd_name_kana'                       => ['string', 'max:255'],
        'd_name_short'                      => ['string', 'max:255'],
        'd_name_short_kana'                 => ['string', 'max:255'],
        'd_color'                           => ['string', 'max:255'],
        'd_slack_channel_id'                => ['string', 'max:255'],
        'd_slack_channel_name'              => ['string', 'max:255'],
        'd_attendance_slack_channel_id'     => ['string', 'max:255'],
        'd_attendance_slack_channel_name'   => ['string', 'max:255'],
        'd_created_at'                      => ['date'],
        'd_updated_at'                      => ['date'],
    ];
}
