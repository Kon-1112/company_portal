<?php

use App\Http\Controllers\Communication\ImportantCommunicationsController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('important-communication/read', [ImportantCommunicationsController::class, 'read']);

Route::get('important-communications/search', [ImportantCommunicationsController::class, 'search']);

// 全ユーザーの一覧を取得する
Route::get('/users', function () {
    return User::all();
});
