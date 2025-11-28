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
            'NIK',
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
        $baseUrl = url('/berkas/storage');

        return [
            $reg->user->name,
            "'" . $reg->user->nik,
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
            null // Nilai
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // HEADER STYLE
        $sheet->getStyle('A1:V1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 12],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D3D3D3']
            ],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical'   => Alignment::VERTICAL_CENTER,
                'wrapText'   => true
            ]
        ]);

        // STYLE DATA
        $sheet->getStyle('A2:V' . $sheet->getHighestRow())
            ->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '000000']
                    ]
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_TOP,
                    'wrapText' => true
                ]
            ]);

        // WARNA KOLOM NILAI (V)
        $sheet->getStyle('V2:V' . $sheet->getHighestRow())
            ->applyFromArray([
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '90EE90']
                ]
            ]);

        // HYPERLINK
        $highestRow = $sheet->getHighestRow();
        for ($row = 2; $row <= $highestRow; $row++) {
            $this->setHyperlink($sheet, "R{$row}");
            $this->setHyperlink($sheet, "S{$row}");
            $this->setHyperlink($sheet, "T{$row}");
            $this->setHyperlink($sheet, "U{$row}");
        }

        // SET WIDTH KOLOM
        $columnWidths = [
            'A' => 25,
            'B' => 20,
            'C' => 20,
            'D' => 20,
            'E' => 15,
            'F' => 15,
            'G' => 15,
            'H' => 30,
            'I' => 15,
            'J' => 15,
            'K' => 15,
            'L' => 15,
            'M' => 20,
            'N' => 30,
            'O' => 25,
            'P' => 15,
            'Q' => 30,
            'R' => 30,
            'S' => 30,
            'T' => 30,
            'U' => 30,
            'V' => 15
        ];

        foreach ($columnWidths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        $sheet->getRowDimension(1)->setRowHeight(30);

        return [];
    }

    protected function setHyperlink(Worksheet $sheet, $cell)
    {
        $url = $sheet->getCell($cell)->getValue();
        if ($url) {
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
