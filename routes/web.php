<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Mail\TestMail;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ダッシュボード
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/testmail', function(){
    Mail::to('test@example.com')->send(new TestMail);
    return 'メール送信完了';
});

// Google OAuth
Route::get('/auth/google/redirect', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Socialite::driver('google')->redirect();
});

// Google OAuth callback
Route::get('/auth/google/callback', [UserController::class, 'googleAuthCallBack']);


Route::get('/about', function () {
    return Inertia::render('About');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
