<?php

namespace App\Http\Controllers\Auth;

use App\Events\LoginUser;
use App\Events\RegisteredUser;
use App\Http\Controllers\Controller;
use App\Service\UserService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

/**
 * Google認証コントローラー
 */
class GoogleAuthController extends Controller
{
    /**
     * @var UserService ユーザーサービス
     */
    private UserService $userService;

    /**
     * コンストラクタ
     * @param UserService $userService ユーザーサービス
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Google認証結果を受け取る
     * @return RedirectResponse
     */
    public function googleAuthCallBack(): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $googleUser = Socialite::driver('google')->stateless()->user();

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
                $user = Auth::user();
                event(new RegisteredUser($user));
            } else {
                Auth::login($user);
                event(new LoginUser($user));
            }

            DB::commit();
            if (!$user->initial_password_flag) {
                return redirect()->route('profile.edit');
            }
            return redirect()->route('dashboard');
        }
        catch (Exception $e) {
            DB::rollBack();
            Log::alert($e);
            var_dump($e);
            exit();
            return redirect()->route('login');
        }
    }
}
