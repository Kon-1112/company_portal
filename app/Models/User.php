<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\HasDatabaseNotifications;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * @var string $table
     */
    protected $table = 't_users';

    /**
     * @var string $primaryKey
     */
    protected $primaryKey = 'id';

    /**
     * @var string $keyType
     */
    protected $keyType = 'string';

    /**
     * @var bool $timestamps
     */
    public $timestamps = false;

    /**
     * インクリメントを無効にする
     * @var bool
     */
    public $incrementing = false;

    /**
     * プライマリキーを指定
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->incrementing = false;
    }

    /**
     * @var array<int, string>
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
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthday' => 'date',
        'hire_date' => 'date',
        'retire_date' => 'date',
        'attendance_flag' => 'boolean',
        'attendance_auto_register_flag' => 'boolean',
        'seat_flag' => 'boolean',
        'telework_flag' => 'boolean',
        'normal_workplace_flag' => 'boolean',
        'telework_request_flag' => 'boolean',
        'peer_bonus_flag' => 'boolean',
        'evaluation_flag' => 'boolean',
        'meeting_flag' => 'boolean',
        'delete_flag' => 'boolean',
        'login_failure_lock_flag' => 'boolean'
    ];

    /**
     * @var array<int, string>
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

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            for ($tryCount = 0; $tryCount <= 5; $tryCount++) {
                $id = "";
                $string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
                // ランダムな文字列を生成
                for ($idIndex = 0; $idIndex < 6; $idIndex++) {
                    $id .= $string[rand(0, strlen($string) - 1)];
                }
                // 既に存在するユーザーIDの場合は再度作成
                if (!User::where('id', $id)->exists()) {
                    $model->id = $id;
                    break;
                }
                // 5回試行しても作成できなかった場合はエラーを返す
                if ($tryCount === 5) {
                    Log::alert('正しくユーザーIDが作成できませんでした');
                    throw new Exception('正しくユーザーが作成できませんでした。');
                }
            }
            $model->created_at = now()->format('Y-m-d H:i:s');
            $model->updated_at = now()->format('Y-m-d H:i:s');
        });
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
     * メール通知をルートする
     * @return array|string
     */
    public function routeNotificationForMail(): array|string
    {
        return [ $this->email => $this->first_name . ' ' . $this->last_name ];
    }
}
