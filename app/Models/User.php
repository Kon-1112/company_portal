<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

/**
 * ユーザーモデル
 * @package App\Models
 */
class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var string $table テーブル名
     */
    protected $table = 't_users';

    /**
     * @var string $keyType 主キーの型
     */
    protected $keyType = 'string';

    /**
     * @var bool $incrementing 主キーの自動増分
     */
    public $incrementing = false;

    /**
     * コンストラクタ
     * @param array $attributes 属性
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->incrementing = false;
    }

    /**
     * @var array<int, string> $fillable ホワイトリスト
     */
    protected $fillable = [
        'id',
        'email',
        'email_verified_at',
        'password',
        'google_id',
        'slack_id',
        'first_name',
        'last_name',
        'first_name_kana',
        'last_name_kana',
        'blood_type_id',
        'gender_id',
        'birthday',
        'phone_number_mobile',
        'phone_number_rental',
        'phone_number_emergency',
        'introduction',
        'commute_other',
        'profile_image_url',
        'profile_image_path',
        'profile_image_name',
        'department_id',
        'hire_date',
        'retire_date',
        'delete_flag',
        'login_failure_lock_flag',
        'attendance_flag',
        'attendance_auto_register_flag',
        'attendance_status_id',
        'seat_flag',
        'seat_id',
        'normal_seat_id',
        'telework_flag',
        'normal_workplace_flag',
        'telework_request_flag',
        'peer_bonus_flag',
        'evaluation_flag',
        'position_id',
        'stage_id',
        'evaluation_period_id',
        'first_evaluation_period_start_date',
        'meeting_flag',
        'role_id',
        'created_at',
        'updated_at',
        'name'
    ];

    /**
     * @var array<int, string> $hidden ブラックリスト
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @var array<string, string> $casts 属性のキャスト
     */
    protected $casts = [
        'email_verified_at'             => 'datetime',
        'birthday'                      => 'date',
        'hire_date'                     => 'date',
        'retire_date'                   => 'date',
        'attendance_flag'               => 'boolean',
        'attendance_auto_register_flag' => 'boolean',
        'seat_flag'                     => 'boolean',
        'telework_flag'                 => 'boolean',
        'normal_workplace_flag'         => 'boolean',
        'telework_request_flag'         => 'boolean',
        'peer_bonus_flag'               => 'boolean',
        'evaluation_flag'               => 'boolean',
        'meeting_flag'                  => 'boolean',
        'delete_flag'                   => 'boolean',
        'login_failure_lock_flag'       => 'boolean'
    ];

    /**
     * @var array<int, string> $guarded ガードする属性
     */
    protected $guarded = [
        'id'
    ];

    /**
     * この部署に所属するユーザーを取得
     * @return BelongsTo
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    /**
     * この職位に所属するユーザーを取得
     * @return BelongsTo
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    /**
     * Slackチャンネルに対する通知をルートする
     * @return string
     */
    public function routeNotificationForSlack(): string
    {
        return config('slack.webhook_url');
    }

    /**
     * モデルが作成される前に呼び出される
     * @return void
     */
    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            $tryLimit = 5;
            $id = static::generateUserId($tryLimit);
            $model->id = $id;
        });
    }

    /**
     * ユーザーIDを生成する
     * @param int $tryLimit
     * @return string
     * @throws Exception
     */
    private static function generateUserId(int $tryLimit): string
    {
        for ($tryCount = 0; $tryCount <= $tryLimit; $tryCount++) {
            $id = static::generateRandomString();
            if (!User::where('id', $id)->exists()) {
                return $id;
            }
        }
        Log::alert('ユーザーIDの生成に' . $tryLimit . '回失敗しました。');
        throw new Exception('正しくユーザーが作成できませんでした。');
    }

    /**
     * ランダムな文字列を生成する
     * @return string
     */
    private static function generateRandomString(): string
    {
        $string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
        $length = strlen($string);
        $id = '';
        for ($idIndex = 0; $idIndex < $length; $idIndex++) {
            $id .= $string[rand(0, $length - 1)];
        }
        return $id;
    }
}
