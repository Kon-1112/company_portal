<?php

namespace App\Models\Communication;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportantCommunicationReadFlg extends Model
{
    use HasFactory;

    protected $table = 't_important_communication_read_flg';

    protected $primaryKey = 'icrf_id';

    protected $keyType = 'int';

    public $incrementing = true;

    public $timestamps = false;

    protected $fillable = [
        'icrf_id',
        'icrf_status',
        'icrf_email',
        'icrf_ic_id',
        'icrf_read_at',
    ];

    protected $casts = [
        'icrf_id' => 'int',
        'icrf_status' => 'boolean',
        'icrf_email' => 'string',
        'icrf_ic_id' => 'int',
        'icrf_read_at' => 'datetime',
    ];
}
