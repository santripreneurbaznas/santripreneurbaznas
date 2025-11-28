<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $registrations = Registration::where('user_id', $user->id)->with(['competition', 'category'])->latest()->get();
        // dd($registrations);

        $registrations =  $registrations->map(function ($reg) {
            return [
                'id' => $reg->id,
                'competition_name' => $reg->competition->name,
                'category_name' => $reg->category->name,
                'category_id' => $reg->category->id,
                'status' => $reg->status,
                'created_at' => $reg->created_at->toISOString(),
                'business_proposal_file' => $reg->business_proposal_file,
                'mustahik_certificate_file' => $reg->mustahik_certificate_file,
                'pesantren_certificate_file' => $reg->pesantren_certificate_file,
                'sktm_certificate_file' => $reg->sktm_certificate_file,
                'can_edit' => $reg->status === 'pending' // Hanya bisa edit jika status pending
            ];
        });

        // dd($registrations);

        return Inertia::render('User/Registrations/Index', [
            'registrations' => $registrations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        set_time_limit(60);
        // dd($request->all());


        $validated = $request->validate([
            'competition_id' => 'required|exists:competitions,id',
            'category_id' => 'required|exists:categories,id',
            'place_of_birth' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'address' => 'required|string|max:255',
            'province' => 'required|string|max:100',
            'kabupaten' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100',
            'kelurahan' => 'required|string|max:100',
            'boarding_school_name' => 'required|string|max:100',
            'motivation' => 'required|string|max:2000',
            'estimated_monthly_income' => 'required',
            'number_wa' => 'required|string|max:20',
            'number_kk' => 'required|string|max:25',
            'business_proposal' => 'required|string', // Sekarang berupa path string
            'mustahik_certificate' => 'required|string',
            'pesantren_certificate' => 'required|string',
            'sktm_certificate' => 'required|string',
        ]);



        // Dapatkan nama user yang login (ganti spasi dengan underscore jika ada)
        $userName = str_replace(' ', '_', auth()->user()->name);

        // Buat timestamp dalam format Indonesia: tanggalbulantahunjam
        $timestamp = now()->format('dmYHi'); // Format: tanggal (d), bulan (m), tahun (Y), jam (H), menit (i)

        // Mapping nama file untuk masing-masing tipe dengan menambahkan timestamp
        $fileNames = [
            'business_proposal' => $userName . '_' . $timestamp . '_proposal_bisnis.pdf',
            'mustahik_certificate' => $userName . '_' . $timestamp . '_sertifikat_mustahik.pdf',
            'pesantren_certificate' => $userName . '_' . $timestamp . '_sertifikat_pesantren.pdf',
            'sktm_certificate' => $userName . '_' . $timestamp . '_sertifikat_sktm.pdf'
        ];

        // Simpan file dengan nama yang sudah ditentukan

        DB::beginTransaction();
        try {
            // Langsung buat registrasi karena file sudah diupload sebelumnya
            $registration = Registration::create([
                'user_id' => auth()->id(),
                'competition_id' => $validated['competition_id'],
                'category_id' => $validated['category_id'],
                'place_of_birth' => $validated['place_of_birth'],
                'date_of_birth' => $validated['date_of_birth'],
                'gender' => $validated['gender'],
                'address' => $validated['address'],
                'province' => $validated['province'],
                'kabupaten' => $validated['kabupaten'],
                'kecamatan' => $validated['kecamatan'],
                'kelurahan' => $validated['kelurahan'],
                'boarding_school_name' => $validated['boarding_school_name'],
                'motivation' => $validated['motivation'],
                'estimated_monthly_income' => $validated['estimated_monthly_income'],
                'number_wa' => $validated['number_wa'],
                'number_kk' => $validated['number_kk'],

                // 🟢 FE → DB mapping (INI YANG PENTING)
                'business_proposal_file'      => $validated['business_proposal'],
                'mustahik_certificate_file'   => $validated['mustahik_certificate'],
                'pesantren_certificate_file'  => $validated['pesantren_certificate'],

                // Jika ada kolom SKTM
                'sktm_certificate_file'       => $validated['sktm_certificate'] ?? null,
            ]);

            DB::commit();

            return redirect()->route('user.registrations.index')->with('success', 'Pendaftaran berhasil dikirim!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal menyimpan data: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        if (!$registration) {
            abort(404);
        }
        $registration->load(['competition', 'category']);

        return Inertia::render('User/Registrations/Show', [
            'registration' => [
                ...$registration->toArray(),
                'can_edit' => $registration->status === 'pending',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Registration $registration)
    {
        // Pastikan user hanya bisa mengedit registrasi miliknya
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Pastikan hanya bisa edit jika status pending
        if ($registration->status !== 'pending') {
            return redirect()->back()->with('error', 'Hanya bisa mengedit pendaftaran dengan status pending');
        }

        // Load data registration dengan relasi competition dan categories
        $registration->load(['competition', 'category']);

        // Dapatkan semua kategori yang aktif dari kompetisi terkait
        $categories = Category::where('competition_id', $registration->competition_id)
            ->where('is_active', true)
            ->get();

        return Inertia::render('User/Registrations/Edit', [
            'registration' => [
                'id' => $registration->id,
                'competition' => [
                    'id' => $registration->competition->id,
                    'name' => $registration->competition->name,
                ],
                'competition_id' => $registration->competition_id,
                'category_id' => $registration->category_id,
                'place_of_birth' => $registration->place_of_birth,
                'date_of_birth' => $registration->date_of_birth,
                'gender' => $registration->gender,
                'address' => $registration->address,
                'province' => $registration->province,
                'kabupaten' => $registration->kabupaten,
                'kecamatan' => $registration->kecamatan,
                'kelurahan' => $registration->kelurahan,
                'boarding_school_name' => $registration->boarding_school_name,
                'motivation' => $registration->motivation,
                'estimated_monthly_income' => $registration->estimated_monthly_income,
                'number_wa' => $registration->number_wa,
                'number_kk' => $registration->number_kk,
                'business_proposal_file_url' => $registration->business_proposal_file
                    ? asset('/berkas/storage/' . $registration->business_proposal_file)
                    : null,
                'mustahik_certificate_file_url' => $registration->mustahik_certificate_file
                    ? asset('/berkas/storage/' . $registration->mustahik_certificate_file)
                    : null,
                'pesantren_certificate_file_url' => $registration->pesantren_certificate_file
                    ? asset('/berkas/storage/' . $registration->pesantren_certificate_file)
                    : null,
                'sktm_certificate_file_url' => $registration->sktm_certificate_file
                    ? asset('/berkas/storage/' . $registration->sktm_certificate_file)
                    : null,
                'status' => $registration->status,

            ],
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    // app/Http/Controllers/User/UserRegistrationController.php
    public function update(Request $request, Registration $registration)
    {

        // dd($request->all());
        // Validasi kepemilikan
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Validasi hanya bisa update jika status pending
        if ($registration->status !== 'pending') {
            return redirect()->back()->with('error', 'Hanya bisa mengupdate pendaftaran dengan status pending');
        }

        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'place_of_birth' => 'sometimes|required|string|max:100',
            'date_of_birth' => 'sometimes|required|date',
            'gender' => 'sometimes|required|in:Laki-laki,Perempuan',
            'address' => 'sometimes|required|string|max:255',
            'province' => 'sometimes|required|string|max:100',
            'kabupaten' => 'sometimes|required|string|max:100',
            'kecamatan' => 'sometimes|required|string|max:100',
            'kelurahan' => 'sometimes|required|string|max:100',
            'boarding_school_name' => 'sometimes|required|string|max:100',
            'motivation' => 'sometimes|required|string|max:2000',
            'estimated_monthly_income' => 'sometimes|required|string|max:50',
            'number_wa' => 'sometimes|required|string|max:20',
            'number_kk' => 'sometimes|required|string|max:25',
            'business_proposal_file' => 'sometimes|nullable|file|mimes:pdf|max:2048',
            'mustahik_certificate_file' => 'sometimes|nullable|file|mimes:pdf|max:2048',
            'pesantren_certificate_file' => 'sometimes|nullable|file|mimes:pdf|max:2048',
            'sktm_certificate_file' => 'sometimes|nullable|file|mimes:pdf|max:2048',
        ]);

        // Dapatkan nama user yang login
        $userName = str_replace(' ', '_', auth()->user()->name);



        // Buat timestamp dalam format Indonesia: tanggalbulantahunjam
        $timestamp = now()->format('dmYHi'); // Format: tanggal (d), bulan (m), tahun (Y), jam (H), menit (i)

        // Mapping nama file untuk masing-masing tipe dengan menambahkan timestamp
        $fileNames = [
            'business_proposal' => $userName . '_' . $timestamp . '_proposal_bisnis.pdf',
            'mustahik_certificate' => $userName . '_' . $timestamp . '_sertifikat_mustahik.pdf',
            'pesantren_certificate' => $userName . '_' . $timestamp . '_sertifikat_pesantren.pdf',
            'sktm_certificate' => $userName . '_' . $timestamp . '_sertifikat_sktm.pdf',
        ];

        // Update file yang diubah
        $fileFields = ['business_proposal', 'mustahik_certificate', 'pesantren_certificate', 'sktm_certificate'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field . '_file')) {
                // Hapus file lama jika ada
                if ($registration->{$field . '_file'}) {
                    Storage::disk('public')->delete($registration->{$field . '_file'});
                }

                // Simpan file baru dengan nama custom
                $file = $request->file($field . '_file');
                $path = $file->storeAs(
                    'registrations/' . $field,
                    $fileNames[$field],
                    'public'
                );
                $registration->{$field . '_file'} = $path;
            }
        }

        // Update field lainnya
        $registration->fill($request->only([
            'category_id',
            'place_of_birth',
            'date_of_birth',
            'gender',
            'address',
            'province',
            'kabupaten',
            'kecamatan',
            'kelurahan',
            'boarding_school_name',
            'motivation',
            'estimated_monthly_income',
            'number_wa',
            'number_kk'

        ]));

        $registration->save();

        return redirect()->route('user.registrations.index')->with('success', 'Pendaftaran berhasil diperbarui');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        // Validasi kepemilikan
        if ($registration->user_id !== auth()->id()) {
            abort(403);
        }

        // Validasi hanya bisa hapus jika status pending
        if ($registration->status !== 'pending') {
            return redirect()->back()->with('error', 'Hanya bisa menghapus pendaftaran dengan status pending');
        }

        // Hapus file
        $fileFields = ['business_proposal', 'mustahik_certificate', 'pesantren_certificate'];
        foreach ($fileFields as $field) {
            Storage::disk('public')->delete($registration->{$field . '_file'});
        }

        $registration->delete();
        return redirect()->route('user.registrations.index')->with('success', 'Pendaftaran berhasil dihapus');
    }
}
