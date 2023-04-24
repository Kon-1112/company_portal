<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{

    use HasFactory;

    /**
     * @var string テーブル名
     */
    protected $table = 'm_menu_category';

    /**
     * @var string 主キー
     */
    protected $primaryKey = 'mc_id';

    /**
     * @var string[] アクセス可能な属性
     */
    protected $fillable = [
        'mc_id',
        'mc_name',
        'mc_description',
        'mc_level',
        'mc_color',
        'mc_read_flag',
        'mc_delete_flag',
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
        'mc_id'             => 'string',
        'mc_name'           => 'string',
        'mc_description'    => 'string',
        'mc_level'          => 'integer',
        'mc_color'          => 'string',
        'mc_read_flag'      => 'boolean',
        'mc_delete_flag'    => 'boolean',
    ];
}
