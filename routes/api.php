<?php

use App\Http\Controllers\Communication\ImportantCommunicationsController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 全ユーザーの一覧を取得する
Route::get('/users', function () {
    return User::all();
});

// 重要連絡を取得する
Route::get('important-communications/search', [ImportantCommunicationsController::class, 'search']);

// ソート
Route::get('important-communications/sort', [ImportantCommunicationsController::class, 'sort']);

// 重要連絡を既読・未読にする
Route::post('important-communications/read', [ImportantCommunicationsController::class, 'read']);

// 重要連絡を作成する
Route::post('important-communications/create', [ImportantCommunicationsController::class, 'create']);

// 重要連絡を更新する
Route::put('important-communications/{id}', [ImportantCommunicationsController::class, 'update']);

// 重要連絡を削除する
Route::delete('important-communications/{id}', [ImportantCommunicationsController::class, 'destroy']);
