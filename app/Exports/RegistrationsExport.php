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
            'Provinsi',
            'Kabupaten',
            'Kecamatan',
            'Kelurahan',
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
        $baseUrl = url('/berkas/storage/');

        return [
            $reg->user->name,
            $reg->competition->name,
            $reg->category->name,
            $reg->place_of_birth,
            $reg->date_of_birth,
            $reg->gender,
            $reg->address,
            $reg->province,
            $reg->kabupaten,
            $reg->kecamatan,
            $reg->kelurahan,
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
        $sheet->getStyle('A1:S1')->applyFromArray([
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
        $sheet->getStyle('A2:S' . $sheet->getHighestRow())
            ->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        'color' => ['rgb' => '000000']
                    ]
                ]
            ]);

        // Warna hijau untuk kolom Nilai (kolom S)
        $sheet->getStyle('S2:S' . $sheet->getHighestRow())
            ->applyFromArray([
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '90EE90'] // Warna hijau muda
                ]
            ]);

        // Format hyperlink untuk kolom file
        $highestRow = $sheet->getHighestRow();

        for ($row = 2; $row <= $highestRow; $row++) {
            // Proposal Bisnis (P kolom - index 15)
            $sheet->getCell("P{$row}")->getHyperlink()->setUrl($sheet->getCell("P{$row}")->getValue());
            $sheet->getStyle("P{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);

            // Sertifikat Mustahik (Q kolom - index 16)
            $sheet->getCell("Q{$row}")->getHyperlink()->setUrl($sheet->getCell("Q{$row}")->getValue());
            $sheet->getStyle("Q{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);

            // Sertifikat Pesantren (R kolom - index 17)
            $sheet->getCell("R{$row}")->getHyperlink()->setUrl($sheet->getCell("R{$row}")->getValue());
            $sheet->getStyle("R{$row}")->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => \PhpOffice\PhpSpreadsheet\Style\Font::UNDERLINE_SINGLE
                ]
            ]);
        }

        // Auto size kolom
        foreach (range('A', 'S') as $columnID) {
            $sheet->getColumnDimension($columnID)->setAutoSize(true);
        }

        return [];
    }
}
