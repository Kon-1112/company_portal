<?php

use App\Http\Controllers\Attendance\ViewAttendanceController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Communication\CompanyCommunicationController;
use App\Http\Controllers\EmployeeRoster\ViewEmployeeRosterController;
use App\Http\Controllers\Communication\ImportantCommunicationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Seat\ViewSeatController;
use App\Http\Controllers\ViewEvaluationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

Route::get('/auth/google/redirect', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', [GoogleAuthController::class, 'googleAuthCallBack']);

Route::middleware('auth')->group(function () {

    /** -----------------------------------------------------------
     * アカウント設定
     * --------------------------------------------------------- */
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    Route::post('/avatar', [ProfileController::class, 'updateAvatar'])
        ->name('avatar.update');

    /** -----------------------------------------------------------
     * 需要連絡・社内連絡
     * --------------------------------------------------------- */
    Route::get('/important-communication', [ImportantCommunicationsController::class, 'index'])
        ->name('importantCommunication.view');
    Route::get('/company-communication', [CompanyCommunicationController::class, 'index'])
        ->name('companyCommunication.view');

    // 既読状態



    // 座席管理
    Route::get('/seat', [ViewSeatController::class, 'view'])->name('seat.view');

    // 期待管理
    Route::get('/attendance', [ViewAttendanceController::class, 'view'])->name('attendance.view');

    // 人事評価管理
    Route::get('/evaluation', [ViewEvaluationController::class, 'view'])->name('evaluation.view');

    // 社員名簿
    Route::get('/employee', [ViewEmployeeRosterController::class, 'view'])->name('employee.view');

});

require __DIR__.'/auth.php';
