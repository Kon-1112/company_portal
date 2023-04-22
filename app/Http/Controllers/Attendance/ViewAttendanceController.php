<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ViewAttendanceController extends Controller
{
    public function view(Request $request): Response
    {
        return Inertia::render('Attendance/Home', [
            'status' => session('status'),
        ]);
    }
}
