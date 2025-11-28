<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class WinnersExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    protected $categoryId;

    public function __construct($categoryId)
    {
        $this->categoryId = $categoryId;
    }

    public function collection()
    {
        return Registration::with(['user', 'category'])
            ->where('category_id', $this->categoryId)
            ->where('is_winner', true)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Lengkap',
            'NIK',
            'Email',
            'Nomor WhatsApp',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'Nama Pesantren',
            'Alamat Lengkap',
            'Provinsi',
            'Kabupaten/Kota',
            'Kecamatan',
            'Kelurahan/Desa',
            'Nomor Kartu Keluarga',
            'Motivasi',
            'Perkiraan Penghasilan Bulanan',
            'Tanggal Pendaftaran'
        ];
    }

    public function map($registration): array
    {
        return [
            $registration->id,
            $registration->user->name,
            $registration->user->nik,
            $registration->user->email,
            $registration->number_wa,
            $registration->place_of_birth,
            $registration->date_of_birth,
            $registration->gender,
            $registration->boarding_school_name,
            $registration->address,
            $registration->province,
            $registration->kabupaten,
            $registration->kecamatan,
            $registration->kelurahan,
            $registration->number_kk,
            $registration->motivation,
            $registration->estimated_monthly_income,
            $registration->created_at->format('d/m/Y H:i')
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text
            1 => ['font' => ['bold' => true]],

            // Set auto size for columns
            'A:Z' => [
                'alignment' => [
                    'wrapText' => true,
                ],
            ],
        ];
    }
}
