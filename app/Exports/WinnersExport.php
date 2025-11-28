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

class WinnersExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    protected $categoryId;
    protected $rowNumber = 0;

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
            'Perkiraan Penghasilan Bulanan',
            'Tanggal Pendaftaran',
        ];
    }

    public function map($r): array
    {
        $this->rowNumber++;

        return [
            $this->rowNumber,
            $r->user->name,
            "'" . $r->user->nik,
            $r->user->email,
            $r->number_wa,
            $r->place_of_birth,
            $r->date_of_birth,
            $r->gender,
            $r->boarding_school_name,
            $r->address,
            $r->province,
            $r->kabupaten,
            $r->kecamatan,
            $r->kelurahan,
            "'" . $r->number_kk,
            $r->estimated_monthly_income,
            $r->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $highestRow = $sheet->getHighestRow();

        // STYLE HEADER
        $sheet->getStyle('A1:Q1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 12],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'D9D9D9']
            ],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical'   => Alignment::VERTICAL_CENTER,
                'wrapText'   => true,
            ]
        ]);

        // STYLE BODY
        $sheet->getStyle("A2:Q{$highestRow}")
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

        // SET WIDTHS
        $columnWidths = [
            'A' => 6,
            'B' => 25,
            'C' => 20,
            'D' => 25,
            'E' => 18,
            'F' => 15,
            'G' => 15,
            'H' => 15,
            'I' => 25,
            'J' => 35,
            'K' => 15,
            'L' => 20,
            'M' => 20,
            'N' => 20,
            'O' => 20,
            'P' => 20,
            'Q' => 20,
        ];

        foreach ($columnWidths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        // HEADER HEIGHT
        $sheet->getRowDimension(1)->setRowHeight(30);

        return [];
    }
}
