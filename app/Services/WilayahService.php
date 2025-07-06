<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class WilayahService
{
    const CACHE_DURATION = 60 * 24 * 3; // Cache 3 hari (dalam menit)

    public function getProvinces(): array
    {
        return Cache::remember('wilayah_provinces', self::CACHE_DURATION, function () {
            try {
                $response = Http::retry(3, 500)
                    ->timeout(3)
                    ->get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
                    ->throw();

                return $response->json();
            } catch (\Exception $e) {
                Log::error('Gagal mengambil data provinsi: ' . $e->getMessage());
                return Cache::get('wilayah_provinces', []); // Fallback to cached data if available
            }
        });
    }

    public function getRegencies(string $provinceId): array
    {
        $cacheKey = "wilayah_regencies_{$provinceId}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($provinceId, $cacheKey) {
            try {
                $response = Http::retry(3, 500)
                    ->timeout(3)
                    ->get("https://www.emsifa.com/api-wilayah-indonesia/api/regencies/{$provinceId}.json")
                    ->throw();

                return $response->json();
            } catch (\Exception $e) {
                Log::error("Gagal mengambil data kabupaten untuk provinsi {$provinceId}: " . $e->getMessage());
                return Cache::get($cacheKey, []); // Fallback to cached data if available
            }
        });
    }

    public function getDistricts(string $regencyId): array
    {
        $cacheKey = "wilayah_districts_{$regencyId}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($regencyId, $cacheKey) {
            try {
                $response = Http::retry(3, 500)
                    ->timeout(3)
                    ->get("https://www.emsifa.com/api-wilayah-indonesia/api/districts/{$regencyId}.json")
                    ->throw();

                return $response->json();
            } catch (\Exception $e) {
                Log::error("Gagal mengambil data kecamatan untuk kabupaten {$regencyId}: " . $e->getMessage());
                return Cache::get($cacheKey, []); // Fallback to cached data if available
            }
        });
    }

    public function getVillages(string $districtId): array
    {
        $cacheKey = "wilayah_villages_{$districtId}";

        return Cache::remember($cacheKey, self::CACHE_DURATION, function () use ($districtId, $cacheKey) {
            try {
                $response = Http::retry(3, 500)
                    ->timeout(3)
                    ->get("https://www.emsifa.com/api-wilayah-indonesia/api/villages/{$districtId}.json")
                    ->throw();

                return $response->json();
            } catch (\Exception $e) {
                Log::error("Gagal mengambil data kelurahan untuk kecamatan {$districtId}: " . $e->getMessage());
                return Cache::get($cacheKey, []); // Fallback to cached data if available
            }
        });
    }
}
