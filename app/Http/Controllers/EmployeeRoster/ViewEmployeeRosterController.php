<?php

namespace App\Http\Controllers\EmployeeRoster;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ViewEmployeeRosterController extends Controller
{
    public function view(Request $request): Response
    {
        return Inertia::render('EmployeeRoster/ImportantCommnucation', [
            'status' => session('status'),
        ]);
    }
}
