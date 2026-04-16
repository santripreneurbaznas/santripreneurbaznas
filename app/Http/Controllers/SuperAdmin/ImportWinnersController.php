<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Imports\UserWinnersImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportWinnersController extends Controller
{
    public function index()
    {
        return Inertia::render('SuperAdmin/Import/Winner');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv,xls'
        ]);

        Excel::import(new UserWinnersImport, $request->file('file'));

        return back()->with('success', 'Data berhasil diimport!');
    }
}
