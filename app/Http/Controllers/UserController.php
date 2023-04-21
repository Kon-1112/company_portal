<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\LoginNotification;
use App\Service\UserLogService;
use App\Service\UserService;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    private UserService $userService;

    /**
     * @var UserLogService
     */
    private UserLogService $userLogService;

    /**
     * コンストラクタ
     * @param UserService $userService
     * @param UserLogService $userLogService
     */
    public function __construct(UserService $userService, UserLogService $userLogService)
    {
        $this->userService = $userService;
        $this->userLogService = $userLogService;
    }

    /**
     * Google認証結果を受け取る
     * @return RedirectResponse
     */
    public function googleAuthCallBack(): RedirectResponse
    {
        try {
            DB::beginTransaction();

            // Googleからユーザー情報を取得する
            $googleUser = Socialite::driver('google')->stateless()->user();

            // ユーザーが存在しない場合は新規作成する
            if (empty($user = $this->userService->getUserByEmail($googleUser->getEmail()))) {
                Auth::login($this->userService->createUser([
                    'google_id'           => $googleUser->getId(),
                    'email'               => $googleUser->getEmail(),
                    'password'            => Hash::make('password'),
                    'first_name'          => $googleUser['family_name'],
                    'last_name'           => $googleUser['given_name'],
                    'profile_image_url'   => $googleUser->getAvatar(),
                    'email_verified_at'   => date('Y-m-d H:i:s'),
                ]));
                $title = '新規登録';
                $sendMsg = '新規登録しました';
            }
             else {
                 Auth::login($user);
                $title = 'ログイン';
                 $sendMsg = 'ログインしました';
             }

            $user = Auth::user();

            // ログインログを作成する
            $this->userLogService->createUserLog([
                'ul_id'           => $user->id,
                'ul_ip_address'     => request()->ip(),
                'ul_user_agent'     => request()->header('User-Agent'),
                'ul_login_at'       => date('Y-m-d H:i:s'),
            ]);


            // Slackに通知する
            $user->notify(new LoginNotification('#random', $title, $sendMsg));

            DB::commit();

            // アカウントの初期設定が完了していなければ設定画面に遷移する
            if (empty($user->first_name_kana) || empty($user->last_name_kana) || $user->initial_password_flag) {
                return redirect()->route('profile.edit');
            }
            return redirect()->route('dashboard');
        }
        catch (Exception $e) {
            DB::rollBack();
            echo($e->getMessage());
            exit();
            Log::alert('Google認証に失敗しました');
            return redirect()->route('login');
        }
    }

    /**
     * ログアウトする
     * @return RedirectResponse
     */
    public function logout(): RedirectResponse
    {
        try {
            if (Auth::check()) {
                $this->userLogService->createUserLog([
                    'ul_id'           => Auth::user()->id,
                    'ul_ip_address'     => request()->ip(),
                    'ul_user_agent'     => request()->header('User-Agent'),
                    'ul_logout_at'      => date('Y-m-d H:i:s'),
                ]);
            }
        }
        catch (Exception $e) {
            DB::rollBack();
            Log::alert('ログの記録に失敗しました');
        }
        Auth::logout();
        return redirect()->route('login');
    }

    /**
     * ユーザー一覧を取得する
     * @return Collection
     */
    public function index(): Collection
    {
        return $this->userService->getUsers();
    }

/**
     * ユーザーを取得する
     * @param int $id
     * @return User
     */
    public function show(int $id): User
    {
        return $this->userService->getUserById($id);
    }

    /**
     * ユーザーを作成する
     * @param Request $request
     * @return void
     */
    public function store(Request $request): void
    {
        $this->userService->createUser($request->all());
    }

    /**
     * ユーザーを更新する
     * @param Request $request
     * @param int $id
     * @return void
     */
    public function update(Request $request, int $id): void
    {
        $this->userService->updateUser($id, $request->all());
    }

    /**
     * ユーザーを削除する
     * @param int $id
     * @return void
     */
    public function destroy(int $id): void
    {
        $this->userService->deleteUser($id);
    }

}
