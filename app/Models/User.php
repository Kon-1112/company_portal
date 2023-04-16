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
    protected $primaryKey = 'u_id';

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
        'u_id',
        'u_email',
        'u_email_verified_at',
        'u_password',
        'u_google_id',
        'u_slack_id',
        'u_first_name',
        'u_last_name',
        'u_first_name_kana',
        'u_last_name_kana',
        'u_blood_type_id',
        'u_gender_id',
        'u_birthday',
        'u_phone_number_mobile',
        'u_phone_number_rental',
        'u_phone_number_emergency',
        'u_introduction',
        'u_commute_other',
        'u_profile_image_url',
        'u_profile_image_path',
        'u_profile_image_name',
        'u_department_id',
        'u_hire_date',
        'u_retire_date',
        'u_delete_flag',
        'u_login_failure_lock_flag',
        'u_attendance_flag',
        'u_attendance_auto_register_flag',
        'u_attendance_status_id',
        'u_seat_flag',
        'u_seat_id',
        'u_normal_seat_id',
        'u_telework_flag',
        'u_normal_workplace_flag',
        'u_telework_request_flag',
        'u_peer_bonus_flag',
        'u_evaluation_flag',
        'u_position_id',
        'u_stage_id',
        'u_evaluation_period_id',
        'u_first_evaluation_period_start_date',
        'u_meeting_flag',
        'u_role_id',
        'u_created_at',
        'u_updated_at',
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
        'u_email_verified_at' => 'datetime',
        'u_birthday' => 'date',
        'u_hire_date' => 'date',
        'u_retire_date' => 'date',
        'u_attendance_flag' => 'boolean',
        'u_attendance_auto_register_flag' => 'boolean',
        'u_seat_flag' => 'boolean',
        'u_telework_flag' => 'boolean',
        'u_normal_workplace_flag' => 'boolean',
        'u_telework_request_flag' => 'boolean',
        'u_peer_bonus_flag' => 'boolean',
        'u_evaluation_flag' => 'boolean',
        'u_meeting_flag' => 'boolean',
        'u_delete_flag' => 'boolean',
        'u_login_failure_lock_flag' => 'boolean'
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
        return $this->belongsTo(Department::class, 'u_department_id');
    }

    /**
     * この職位に所属するユーザーを取得
     * @return BelongsTo
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'u_position_id');
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
                if (!User::where('u_id', $id)->exists()) {
                    $model->u_id = $id;
                    break;
                }
                // 5回試行しても作成できなかった場合はエラーを返す
                if ($tryCount === 5) {
                    Log::alert('正しくユーザーIDが作成できませんでした');
                    throw new Exception('正しくユーザーが作成できませんでした。');
                }
            }
            $model->u_created_at = now()->format('Y-m-d H:i:s');
            $model->u_updated_at = now()->format('Y-m-d H:i:s');
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
}
