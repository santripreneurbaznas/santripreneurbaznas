<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Hyperlink;

class RegistrationsExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    protected $managedCategories;

    public function __construct($managedCategories)
    {
        $this->managedCategories = $managedCategories;
    }

    public function collection()
    {
        return Registration::with(['user', 'competition', 'category'])
            ->whereIn('category_id', $this->managedCategories)
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama Peserta',
            'Kompetisi',
            'Kategori',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'Alamat',
            'Nama Pesantren',
            'Motivasi',
            'Perkiraan Penghasilan Bulanan',
            'Nomor WA',
            'Link Proposal Bisnis',
            'Sertifikat Mustahik',
            'Sertifikat Pesantren',
            'Nilai'
        ];
    }

    public function map($reg): array
    {
        $baseUrl = url('/storage/');

        return [
            $reg->user->name,
            $reg->competition->name,
            $reg->category->name,
            $reg->place_of_birth,
            $reg->date_of_birth,
            $reg->gender,
            $reg->address,
            $reg->boarding_school_name,
            $reg->motivation,
            $reg->estimated_monthly_income,
            $reg->number_wa,
            $baseUrl . '/' . $reg->business_proposal_file,
            $baseUrl . '/' . $reg->mustahik_certificate_file,
            $baseUrl . '/' . $reg->pesantren_certificate_file,
            null // Kolom nilai kosong
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Style untuk header
        $sheet->getStyle('A1:O1')->applyFromArray([
            'font' => [
                'bold' => true
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D3D3D3']
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                ]
            ]
        ]);

        // Style untuk seluruh data
        $sheet->getStyle('A2:O' . $sheet->getHighestRow())
            ->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['rgb' => '000000']
                    ]
                ]
            ]);

        // Warna hijau untuk kolom Nilai
        $sheet->getStyle('O2:O' . $sheet->getHighestRow())
            ->applyFromArray([
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '90EE90']
                ]
            ]);

        // Format hyperlink untuk kolom file
        $highestRow = $sheet->getHighestRow();

        for ($row = 2; $row <= $highestRow; $row++) {
            // Proposal Bisnis (L kolom)
            $sheet->getCell("L{$row}")->getHyperlink()->setUrl($sheet->getCell("L{$row}")->getValue());
            $sheet->getStyle("L{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);

            // Sertifikat Mustahik (M kolom)
            $sheet->getCell("M{$row}")->getHyperlink()->setUrl($sheet->getCell("M{$row}")->getValue());
            $sheet->getStyle("M{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);

            // Sertifikat Pesantren (N kolom)
            $sheet->getCell("N{$row}")->getHyperlink()->setUrl($sheet->getCell("N{$row}")->getValue());
            $sheet->getStyle("N{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);
        }

        // Auto size kolom
        foreach (range('A', 'O') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }

        return [];
    }
}
