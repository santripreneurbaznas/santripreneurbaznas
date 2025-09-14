<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Static Pages
    |--------------------------------------------------------------------------
    | Daftar halaman statis yang ingin selalu muncul di sitemap
    | Lokasi ditulis relatif ke domain utama
    */

    'static_pages' => [
        [
            'loc' => '/',
            'priority' => 1.0,
            'freq' => 'daily',
        ],
        [
            'loc' => '/kompetisi',
            'priority' => 0.9,
            'freq' => 'weekly',
        ],
        [
            'loc' => '/announcement',
            'priority' => 0.9,
            'freq' => 'weekly',
        ],
    ],

];
