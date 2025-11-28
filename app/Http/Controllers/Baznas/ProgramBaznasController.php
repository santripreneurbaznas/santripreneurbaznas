<?php

namespace App\Http\Controllers\Baznas;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramBaznasController extends Controller
{
    public function index()
    {

        $competitions = Competition::with('categories')->get();
        return Inertia::render('Baznas/Program', [
            'competitions' => $competitions,
        ]);
    }
}
