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
                'nik' => null,
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Santrigo',
                'email' => 'official.santrigo@gmail.com',
                'password' => Hash::make('password'),
                'nik' => null,
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin1',
                'email' => 'admin1@gmail.com',
                'password' => Hash::make('password'),
                'nik' => null,
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin2',
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('password'),
                'nik' => null,
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('password'),
                'nik' => rand(80000000, 9999999999),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user2',
                'email' => 'user2@gmail.com',
                'password' => Hash::make('password'),
                'nik' => rand(80000000, 9999999999),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user3',
                'email' => 'user3@gmail.com',
                'password' => Hash::make('password'),
                'nik' => rand(80000000, 9999999999),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user4',
                'email' => 'user4@gmail.com',
                'password' => Hash::make('password'),
                'nik' => rand(80000000, 9999999999),
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user5',
                'email' => 'user5@gmail.com',
                'password' => Hash::make('password'),
                'nik' => rand(80000000, 9999999999),
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
        // 7. Registration
        // 7. Registration
        $indonesiaRegions = [
            [
                'province' => 'Jawa Barat',
                'regencies' => [
                    [
                        'name' => 'Kabupaten Bandung',
                        'districts' => [
                            [
                                'name' => 'Cimenyan',
                                'villages' => ['Cimenyan', 'Mekarsaluyu', 'Padasuka']
                            ],
                            [
                                'name' => 'Cileunyi',
                                'villages' => ['Cileunyi Kulon', 'Cileunyi Wetan', 'Cinunuk']
                            ]
                        ]
                    ],
                    [
                        'name' => 'Kota Bandung',
                        'districts' => [
                            [
                                'name' => 'Sukajadi',
                                'villages' => ['Sukagalih', 'Sukawarna', 'Cipedes']
                            ],
                            [
                                'name' => 'Coblong',
                                'villages' => ['Dago', 'Lebak Siliwangi', 'Merdeka']
                            ]
                        ]
                    ]
                ]
            ],
            [
                'province' => 'Jawa Tengah',
                'regencies' => [
                    [
                        'name' => 'Kota Semarang',
                        'districts' => [
                            [
                                'name' => 'Banyumanik',
                                'villages' => ['Banyumanik', 'Gedawang', 'Padangsari']
                            ],
                            [
                                'name' => 'Tembalang',
                                'villages' => ['Tembalang', 'Bulusan', 'Kedungmundu']
                            ]
                        ]
                    ],
                    [
                        'name' => 'Kabupaten Semarang',
                        'districts' => [
                            [
                                'name' => 'Tengaran',
                                'villages' => ['Tegalrejo', 'Karangduren', 'Nyamat']
                            ],
                            [
                                'name' => 'Suruh',
                                'villages' => ['Plumbon', 'Krandon Lor', 'Gentan']
                            ]
                        ]
                    ]
                ]
            ],
            [
                'province' => 'Jawa Timur',
                'regencies' => [
                    [
                        'name' => 'Kota Surabaya',
                        'districts' => [
                            [
                                'name' => 'Tenggilis Mejoyo',
                                'villages' => ['Tenggilis Mejoyo', 'Gunung Anyar', 'Keebon Agung']
                            ],
                            [
                                'name' => 'Wonokromo',
                                'villages' => ['Wonokromo', 'Darmo', 'Jagir']
                            ]
                        ]
                    ],
                    [
                        'name' => 'Kabupaten Sidoarjo',
                        'districts' => [
                            [
                                'name' => 'Taman',
                                'villages' => ['Bohar', 'Ketegan', 'Kalijaten']
                            ],
                            [
                                'name' => 'Krian',
                                'villages' => ['Kemasan', 'Krian', 'Ponokawan']
                            ]
                        ]
                    ]
                ]
            ]
        ];

        // Hitung jumlah user yang tersedia (dari seeder sebelumnya ada 9 user)
        $availableUsers = DB::table('users')->where('role_id', 3)->get(); // Ambil hanya user biasa (role_id 3)
        $userCount = count($availableUsers);

        $counter = 0;
        foreach ($indonesiaRegions as $provinceIndex => $provinceData) {
            foreach ($provinceData['regencies'] as $regencyIndex => $regencyData) {
                foreach ($regencyData['districts'] as $districtIndex => $districtData) {
                    foreach ($districtData['villages'] as $villageIndex => $villageName) {
                        // Pastikan tidak melebihi jumlah user yang tersedia
                        if ($counter >= $userCount) {
                            break 4; // Keluar dari semua loop
                        }

                        $user = $availableUsers[$counter];
                        $counter++;

                        Registration::create([
                            'user_id' => $user->id, // Gunakan ID user yang benar
                            'competition_id' => 1,
                            'category_id' => rand(1, 3),

                            'place_of_birth' => 'Kota ' . $counter,
                            'date_of_birth' => Carbon::now()->subYears(20 + $counter)->format('Y-m-d'),
                            'gender' => $counter % 2 == 0 ? 'Laki-laki' : 'Perempuan',
                            'address' => 'Jalan Contoh No. ' . $counter . ' RT 0' . $counter . '/RW 0' . $counter,
                            'province' => $provinceData['province'],
                            'kabupaten' => $regencyData['name'],
                            'kecamatan' => $districtData['name'],
                            'kelurahan' => $villageName,
                            'boarding_school_name' => 'Pesantren Al-Hikmah ' . $counter,
                            'motivation' => 'Saya ingin menjadi pengusaha sukses ' . $counter,
                            'estimated_monthly_income' => rand(1, 5) . '000000',
                            'number_wa' => '0812' . rand(1000000, 9999999),

                            'business_proposal_file' => 'proposals/bisnis_' . $counter . '.pdf',
                            'mustahik_certificate_file' => 'mustahik/surat_' . $counter . '.pdf',
                            'pesantren_certificate_file' => 'ijazah/ijazah_' . $counter . '.pdf',

                            'status' => 'pending',
                            'created_at' => Carbon::now()->subDays(rand(1, 30)),
                            'updated_at' => Carbon::now()->subDays(rand(0, 29)),
                        ]);
                    }
                }
            }
        }

        // Tambahkan fungsi ini di class seeder Anda

    }
}
