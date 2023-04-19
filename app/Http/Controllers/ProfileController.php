<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * アカウント設定画面を表示する
     * @param Request $request
     * @return Response
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
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
        if ($request->user()->isDirty('u_email')) {
            $request->user()->u_email_verified_at = null;
        }
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        if (Auth::check()) {
//            $user = Auth::user();
//            var_dump(Hash::check($request->u_password, $request->user()->u_password));
//
//            $request->validate([
//                'u_password' => ['required', 'current_password'],
//            ]);
            $user = $request->user();

            Auth::logout();
            $user->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::to('/');
        }
        return Redirect::to('/login');
    }
}
