<?php

namespace App\Imports;

use App\Models\Registration;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class UserWinnersImport implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        $rows->shift();

        foreach ($rows as $row) {

            $name       = trim($row[0] ?? '');
            $nik        = trim($row[1] ?? '');
            $gender     = $row[2] ?? '-';
            $province   = $row[3] ?? '-';
            $kabupaten  = $row[4] ?? '-';
            $kecamatan  = $row[5] ?? '-';
            $kelurahan  = $row[6] ?? '-';

            if (empty($name) || empty($nik)) {
                continue;
            }

            $competitionId = 10;
            $categoryId    = 12;

            // 🔍 CEK USER
            $user = User::where('nik', $nik)->first();

            if ($user) {

                // 🔍 CEK REGISTRATION SESUAI COMPETITION & CATEGORY
                $registration = Registration::where('user_id', $user->id)
                    ->where('competition_id', $competitionId)
                    ->where('category_id', $categoryId)
                    ->first();

                if ($registration) {
                    // ✅ SUDAH ADA → UPDATE
                    $registration->update([
                        'is_winner' => 1
                    ]);
                } else {
                    // ❌ BELUM ADA → CREATE BARU
                    Registration::create([
                        'user_id' => $user->id,
                        'competition_id' => $competitionId,
                        'category_id' => $categoryId,
                        'place_of_birth' => '-',
                        'date_of_birth' => now()->format('Y-m-d'),
                        'gender' => $gender,
                        'number_kk' => '-',
                        'address' => '-',
                        'province' => $province,
                        'kabupaten' => $kabupaten,
                        'kecamatan' => $kecamatan,
                        'kelurahan' => $kelurahan,
                        'boarding_school_name' => '-',
                        'motivation' => '-',
                        'estimated_monthly_income' => '-',
                        'number_wa' => '08' . substr($nik, -10),
                        'is_winner' => 1,
                        'business_proposal_file' => '-',
                        'mustahik_certificate_file' => '-',
                        'pesantren_certificate_file' => '-',
                        'sktm_certificate_file' => '-',
                    ]);
                }
            } else {
                // ❌ USER BELUM ADA → CREATE

                $user = User::create([
                    'name' => $name,
                    'email' => $nik . rand(100, 999) . '@example.com',
                    'no_wa' => '08' . substr($nik, -11),
                    'nik' => $nik,
                    'password' => Hash::make('Santripreneurbaznas.123'),
                    'role_id' => 3,
                ]);

                Registration::create([
                    'user_id' => $user->id,
                    'competition_id' => $competitionId,
                    'category_id' => $categoryId,
                    'place_of_birth' => '-',
                    'date_of_birth' => now()->format('Y-m-d'),
                    'gender' => $gender,
                    'number_kk' => '-',
                    'address' => '-',
                    'province' => $province,
                    'kabupaten' => $kabupaten,
                    'kecamatan' => $kecamatan,
                    'kelurahan' => $kelurahan,
                    'boarding_school_name' => '-',
                    'motivation' => '-',
                    'estimated_monthly_income' => '-',
                    'number_wa' => '08' . substr($nik, -10),
                    'is_winner' => 1,
                    'business_proposal_file' => '-',
                    'mustahik_certificate_file' => '-',
                    'pesantren_certificate_file' => '-',
                    'sktm_certificate_file' => '-',
                ]);
            }
        }
    }
}
