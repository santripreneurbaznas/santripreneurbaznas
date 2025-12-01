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

class UsersWithoutRegistrationExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function collection()
    {
        return User::where('role_id', 3)
            ->where(function ($query) {
                $query->whereDoesntHave('registrations')
                    ->orWhereDoesntHave('registrations', function ($sub) {
                        $sub->where('is_winner', true);
                    });
            })
            ->select('name', 'nik', 'email', 'no_wa', 'created_at')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama',
            'NIK',
            'Email',
            'No WA',
            'Tanggal Daftar',
        ];
    }

    public function map($user): array
    {
        return [
            $user->name,
            "'" . $user->nik,
            $user->email,
            "'" . $user->no_wa,
            $user->created_at ? $user->created_at->format('d-m-Y H:i') : '',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Style header (A1:E1)
        $sheet->getStyle('A1:E1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D3D3D3'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ]);

        // Style semua data (A2:E...)
        $sheet->getStyle('A2:E' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'vertical' => Alignment::VERTICAL_TOP,
                'wrapText' => true,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ]);

        // Alignment kolom per kolom
        $sheet->getStyle('A2:A' . $sheet->getHighestRow())->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);   // Nama
        $sheet->getStyle('B2:B' . $sheet->getHighestRow())->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER); // NIK
        $sheet->getStyle('C2:C' . $sheet->getHighestRow())->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);   // Email
        $sheet->getStyle('D2:D' . $sheet->getHighestRow())->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);   // No WA
        $sheet->getStyle('E2:E' . $sheet->getHighestRow())->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER); // Tgl daftar

        // Lebar kolom
        $sheet->getColumnDimension('A')->setWidth(30); // Nama
        $sheet->getColumnDimension('B')->setWidth(20); // NIK
        $sheet->getColumnDimension('C')->setWidth(30); // Email
        $sheet->getColumnDimension('D')->setWidth(18); // No WA
        $sheet->getColumnDimension('E')->setWidth(22); // Tanggal Daftar

        // Tinggi header
        $sheet->getRowDimension(1)->setRowHeight(25);

        // Freeze header
        $sheet->freezePane('A2');

        return [];
    }
}
