<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ViewEvaluationController extends Controller
{
    public function view(Request $request): Response
    {
        return Inertia::render('Evaluation/ImportantCommnucation', [
            'status' => session('status'),
        ]);
    }
}
