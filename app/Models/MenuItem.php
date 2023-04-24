<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{

    use HasFactory;

    /**
     * @var string テーブル名
     */
    protected $table = 'm_menu_item';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'mi_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'mi_id',
        'mi_mc_id',
        'mi_name',
        'mi_icon',
        'mi_order',
        'mi_url',
        'mi_route',
        'mi_color',
        'mi_delete_flag',
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
        'mi_id'             => 'string',
        'mi_mc_id'          => 'integer',
        'mi_name'           => 'string',
        'mi_icon'           => 'string',
        'mi_order'          => 'integer',
        'mi_url'            => 'string',
        'mi_route'          => 'string',
        'mi_color'          => 'string',
        'mi_delete_flag'    => 'boolean',
    ];
}
