<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class RegisteredAdminUserController extends Controller
{

    public function index()
    {
        return view('admin.index');
    }
}
