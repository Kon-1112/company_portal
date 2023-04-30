<?php

namespace App\Http\Controllers\Communication;

use App\Http\Controllers\Controller;

class CompanyCommunicationController extends Controller
{
    public function index()
    {
        return view('communication.companyCommunication');
    }
}
