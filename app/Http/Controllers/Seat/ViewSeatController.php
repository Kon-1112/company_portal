<?php

namespace App\Http\Controllers\Seat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ViewSeatController extends Controller
{
    public function view(Request $request): Response
    {
        return Inertia::render('Seat/Home', [
            'status' => session('status'),
        ]);
    }
}
