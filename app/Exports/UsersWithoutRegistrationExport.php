<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class UsersWithoutRegistrationExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function collection()
    {
        // Ambil user yang tidak memiliki relasi dengan registrations dan role_id = 3
        return User::whereDoesntHave('registrations')
            ->where('role_id', 3)
            ->select('name', 'nik', 'email')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama',
            'NIK',
            'Email'
        ];
    }

    public function map($user): array
    {
        return [
            $user->name,
            "'" . $user->nik, // Prepend with ' to preserve leading zeros
            $user->email
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Style untuk header
        $sheet->getStyle('A1:C1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D3D3D3']
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN
                ]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ]
        ]);

        // Style untuk seluruh data
        $sheet->getStyle('A2:C' . $sheet->getHighestRow())
            ->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000']
                    ]
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_TOP,
                    'wrapText' => true,
                ]
            ]);

        // Set alignment khusus untuk kolom
        $sheet->getStyle('A2:A' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
            ]
        ]);

        $sheet->getStyle('B2:B' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ]
        ]);

        $sheet->getStyle('C2:C' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
            ]
        ]);

        // Set width kolom
        $sheet->getColumnDimension('A')->setWidth(30); // Nama
        $sheet->getColumnDimension('B')->setWidth(20); // NIK
        $sheet->getColumnDimension('C')->setWidth(30); // Email

        // Set tinggi baris header
        $sheet->getRowDimension(1)->setRowHeight(25);

        // Auto size rows for better text wrapping
        foreach (range('A', 'C') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(false);
        }

        // Freeze header row
        $sheet->freezePane('A2');

        return [];
    }
}
