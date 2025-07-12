<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function down()
    {
        Artisan::call('down', [
            '--secret' => 'santripreneur', // Ganti dengan kode rahasia
            '--refresh' => 60, // Auto-refresh setiap 60 detik
            '--retry' => 60, // Header Retry-After

        ]);

        return response()->json(['success' => true, 'message' => 'Maintenance mode diaktifkan']);
    }

    // Untuk menonaktifkan maintenance mode
    public function up()
    {
        Artisan::call('up');
        return response()->json(['success' => true, 'message' => 'Maintenance mode dinonaktifkan']);
    }

    public function index()
    {
        return Inertia::render('Maintenance');
    }
}
