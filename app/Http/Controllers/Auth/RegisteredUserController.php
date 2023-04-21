<?php

namespace App\Http\Controllers\Auth;

use App\Events\RegisteredUser;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * ユーザー登録コントローラー
 */
class RegisteredUserController extends Controller
{

    /**
     * ユーザー登録ページを表示する
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * ユーザーを登録する
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name'    => 'required|string|max:10',
            'last_name'     => 'required|string|max:10',
            'email'         => 'required|string|email|max:25|unique:'.User::class,
            'password'      => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
