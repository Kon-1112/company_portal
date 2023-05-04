<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Service\UserService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

/**
 * アカウント設定コントローラ
 */
class ProfileController extends Controller
{

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * アカウント設定画面を表示する
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/ProfileEdit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * アカウント情報を更新する
     * @param ProfileUpdateRequest $request
     * @return RedirectResponse
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
            $request->user()->save();
        }
        $this->userService->update($request->user(), $request->validated());
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        if (Auth::check()) {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
            $user = $request->user();

            Auth::logout();
            $user->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::to('/');
        }
        return Redirect::to('/login');
    }

    /**
     * アバター画像を更新する
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar_file_data' => ['required'],
        ]);

        $this->userService->uploadAvatar($request->user(), $request->file('avatar_file_data'));

        return Redirect::route('profile.edit');
    }
}
