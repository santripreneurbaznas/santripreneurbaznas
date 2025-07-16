<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

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
            'Nomor KK',
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
            'Link Assesmen Mustahik',
            'Link Ijazah Pesantren',
            'Link Surat SKTM',
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
            "'" . $reg->number_kk,
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
            $baseUrl . '/' . $reg->sktm_certificate_file,
            null // Kolom nilai kosong
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Style untuk header
        $sheet->getStyle('A1:U1')->applyFromArray([
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
        $sheet->getStyle('A2:U' . $sheet->getHighestRow())
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

        // Set alignment khusus untuk kolom tertentu
        $sheet->getStyle('A2:A' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
            ]
        ]);

        $sheet->getStyle('D2:D' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ]
        ]);

        $sheet->getStyle('P2:P' . $sheet->getHighestRow())->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ]
        ]);

        // Warna hijau untuk kolom Nilai (kolom U)
        $sheet->getStyle('U2:U' . $sheet->getHighestRow())
            ->applyFromArray([
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '90EE90'] // Warna hijau muda
                ]
            ]);

        // Format hyperlink untuk kolom file
        $highestRow = $sheet->getHighestRow();

        for ($row = 2; $row <= $highestRow; $row++) {
            // Proposal Bisnis (Q kolom - index 17)
            $this->setHyperlink($sheet, "Q{$row}");

            // Sertifikat Mustahik (R kolom - index 18)
            $this->setHyperlink($sheet, "R{$row}");

            // Sertifikat Pesantren (S kolom - index 19)
            $this->setHyperlink($sheet, "S{$row}");

            // Surat SKTM (T kolom - index 20)
            $this->setHyperlink($sheet, "T{$row}");
        }

        // Set width kolom
        $sheet->getColumnDimension('A')->setWidth(25); // Nama Peserta
        $sheet->getColumnDimension('B')->setWidth(20); // Kompetisi
        $sheet->getColumnDimension('C')->setWidth(20); // Kategori
        $sheet->getColumnDimension('D')->setWidth(15); // Nomor KK
        $sheet->getColumnDimension('E')->setWidth(15); // Tempat Lahir
        $sheet->getColumnDimension('F')->setWidth(15); // Tanggal Lahir
        $sheet->getColumnDimension('G')->setWidth(15); // Jenis Kelamin
        $sheet->getColumnDimension('H')->setWidth(30); // Alamat
        $sheet->getColumnDimension('I')->setWidth(15); // Provinsi
        $sheet->getColumnDimension('J')->setWidth(15); // Kabupaten
        $sheet->getColumnDimension('K')->setWidth(15); // Kecamatan
        $sheet->getColumnDimension('L')->setWidth(15); // Kelurahan
        $sheet->getColumnDimension('M')->setWidth(20); // Nama Pesantren
        $sheet->getColumnDimension('N')->setWidth(30); // Motivasi
        $sheet->getColumnDimension('O')->setWidth(25); // Perkiraan Penghasilan
        $sheet->getColumnDimension('P')->setWidth(15); // Nomor WA
        $sheet->getColumnDimension('Q')->setWidth(30); // Link Proposal Bisnis
        $sheet->getColumnDimension('R')->setWidth(30); // Link Assesmen Mustahik
        $sheet->getColumnDimension('S')->setWidth(30); // Link Ijazah Pesantren
        $sheet->getColumnDimension('T')->setWidth(30); // Link Surat SKTM
        $sheet->getColumnDimension('U')->setWidth(15); // Nilai

        // Set tinggi baris header
        $sheet->getRowDimension(1)->setRowHeight(30);

        return [];
    }

    protected function setHyperlink(Worksheet $sheet, $cell)
    {
        $url = $sheet->getCell($cell)->getValue();
        if (!empty($url)) {
            $sheet->getCell($cell)->getHyperlink()->setUrl($url);
            $sheet->getStyle($cell)->applyFromArray([
                'font' => [
                    'color' => ['rgb' => '0563C1'],
                    'underline' => Font::UNDERLINE_SINGLE
                ]
            ]);
        }
    }
}
