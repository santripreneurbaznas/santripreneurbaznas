<?php

namespace Database\Seeders;

use App\Models\Registration;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FullDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $roles = [
            ['name' => 'super_admin'],
            ['name' => 'admin'],
            ['name' => 'user'],
        ];
        DB::table('roles')->insert($roles);

        // 2. Users
        $users = [
            [
                'name' => 'superadmin',
                'email' => 'santripreneurbaznas.id@gmail.com',
                'password' => Hash::make('Bismillah.123'),
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Santrigo',
                'email' => 'official.santrigo@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin1',
                'email' => 'admin1@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin2',
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user2',
                'email' => 'user2@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user3',
                'email' => 'user3@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user4',
                'email' => 'user4@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user5',
                'email' => 'user5@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('users')->insert($users);
        // 4. Competitions
        $competitions = [
            [
                'name' => 'Santripreneur BAZNAS 2025',
                'description' => 'Kompetisi penyelenggaraan Santripreneur BAZNAS 2025',
                'start_date' => '2025-07-01',
                'end_date' => '2025-08-01',


                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('competitions')->insert($competitions);

        // 3. Categories
        $categories = [
            [
                'name' => 'Haji dan Umroh',
                'description' => 'Kompetisi bidang haji dan umroh',
                'competition_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),

            ],
            [
                'name' => 'Industri Kreatif',
                'description' => 'Kompetisi bidang industri kreatif',
                'competition_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Peternakan',
                'description' => 'Kompetisi bidang peternakan',
                'competition_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        DB::table('categories')->insert($categories);



        // 5. Registrations


        // 6. AdminCategoryAccess
        $adminAccess = [
            [
                'user_id' => 2,
                'category_id' => 1,
                'created_at' => now(),
            ],
            [
                'user_id' => 3,
                'category_id' => 2,
                'created_at' => now(),
            ],
            [
                'user_id' => 4,
                'category_id' => 3,
                'created_at' => now(),
            ],
        ];
        DB::table('admin_category_access')->insert($adminAccess);

        for ($i = 1; $i <= 5; $i++) {
            Registration::create([
                'user_id' => $i + 3,
                'competition_id' => 1,
                'category_id' => rand(1, 3),

                'place_of_birth' => 'Kota ' . $i,
                'date_of_birth' => Carbon::now()->subYears(20 + $i)->format('Y-m-d'),
                'gender' => $i % 2 == 0 ? 'female' : 'male',
                'address' => 'Jalan Contoh No. ' . $i,
                'boarding_school_name' => 'Pesantren Al-Hikmah ' . $i,
                'motivation' => 'Saya ingin menjadi pengusaha sukses ' . $i,
                'estimated_monthly_income' => '1500000',
                'number_wa' => '0812345678' . $i,

                'business_proposal_file' => 'proposals/bisnis_' . $i . '.pdf',
                'mustahik_certificate_file' => 'mustahik/surat_' . $i . '.pdf',
                'pesantren_certificate_file' => 'ijazah/ijazah_' . $i . '.pdf',

                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
