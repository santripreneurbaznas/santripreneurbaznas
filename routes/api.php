<?php

use App\Models\Competition;
use App\Services\WilayahService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/active-competitions', function () {
    return Competition::with('categories')
        ->where('is_active', true)
        ->where('end_date', '>=', now())
        ->orderBy('start_date', 'asc')
        ->get();
});
// Route::get('/provinces', function () {
//     $response = Http::get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
//     return $response->json();
// });

// Route::get('/regencies/{provinceId}', function ($provinceId) {
//     $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$provinceId}.json");
//     return $response->json();
// });

// Route::get('/districts/{regencyId}', function ($regencyId) {
//     $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/districts/{$regencyId}.json");
//     return $response->json();
// });

// Route::get('/villages/{districtId}', function ($districtId) {
//     $response = Http::get("https://www.emsifa.com/api-wilayah-indonesia/api/villages/{$districtId}.json");
//     return $response->json();
// });

Route::prefix('wilayah')->group(function () {
    Route::get('/provinces', function () {
        return response()->json(app(WilayahService::class)->getProvinces());
    });

    Route::get('/regencies/{provinceId}', function ($provinceId) {
        return response()->json(app(WilayahService::class)->getRegencies($provinceId));
    });

    Route::get('/districts/{regencyId}', function ($regencyId) {
        return response()->json(app(WilayahService::class)->getDistricts($regencyId));
    });

    Route::get('/villages/{districtId}', function ($districtId) {
        return response()->json(app(WilayahService::class)->getVillages($districtId));
    });
});
