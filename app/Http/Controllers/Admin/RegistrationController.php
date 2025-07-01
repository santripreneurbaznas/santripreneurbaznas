<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExportRegistrationAdmin;
use App\Exports\RegistrationsExport;
use App\Http\Controllers\Controller;
use App\Models\AdminCategoryAccessModel;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil kategori yang dikelola admin
        $managedCategories = auth()->user()->managedCategories()->pluck('categories.id');

        // Jika admin belum memiliki kategori, kembalikan koleksi kosong
        if ($managedCategories->isEmpty()) {
            return Inertia::render('Admin/Registrations/Index', [
                'registrations' => [],
                'meta' => [
                    'total' => 0,
                    'per_page' => 10,
                    'current_page' => 1,
                    'last_page' => 1,
                ]
            ]);
        }

        // Query registrasi dengan pagination
        $registrations = Registration::with(['user', 'competition', 'category'])
            ->whereIn('category_id', $managedCategories)
            ->latest()
            ->paginate(5); // 10 item per halaman

        return Inertia::render('Admin/Registrations/Index', [
            'registrations' => $registrations->map(function ($reg) {
                return [
                    'id' => $reg->id,
                    'user_name' => $reg->user->name,
                    'competition_name' => $reg->competition->name,
                    'category_name' => $reg->category->name,
                    'place_of_birth' => $reg->place_of_birth,
                    'date_of_birth' => $reg->date_of_birth,
                    'gender' => $reg->gender,
                    'address' => $reg->address,
                    'boarding_school_name' => $reg->boarding_school_name,
                    'motivation' => $reg->motivation,
                    'estimated_monthly_income' => $reg->estimated_monthly_income,
                    'number_wa' => $reg->number_wa,
                    'business_proposal_file' => asset('storage/' . $reg->business_proposal_file),
                    'mustahik_certificate_file' => asset('storage/' . $reg->mustahik_certificate_file),
                    'pesantren_certificate_file' => asset('storage/' . $reg->pesantren_certificate_file),
                    'status' => $reg->status,
                    'created_at' => $reg->created_at->format('d/m/Y H:i'),
                ];
            }),
            'meta' => [
                'total' => $registrations->total(),
                'per_page' => $registrations->perPage(),
                'current_page' => $registrations->currentPage(),
                'last_page' => $registrations->lastPage(),
            ]
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        if (!$registration) {
            abort(404);
        }
        $registration->load(['competition', 'category', 'user']);

        return Inertia::render('Admin/Registrations/Show', [
            'registration' => [
                ...$registration->toArray(),
                'can_edit' => $registration->status === 'pending',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Registration $registration)
    {

        // dd($registration->category_id);
        $hasAccess = AdminCategoryAccessModel::where('user_id', auth()->id())
            ->where('category_id', $registration->category_id) // langsung dari registrasi
            ->exists();
        // dd($hasAccess);
        if (!$hasAccess) {
            abort(403, 'Unauthorized action. You do not have access to this category.');
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected'
        ]);

        $registration->update($validated);
        return redirect()->back()->with('success', 'Status pendaftaran berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }



    function export_excel()
    {
        $managedCategories = auth()->user()->managedCategories()->pluck('categories.id');

        if ($managedCategories->isEmpty()) {
            return back()->with('error', 'Anda belum mengelola kategori apapun');
        }

        $count = Registration::whereIn('category_id', $managedCategories)->count();

        if ($count === 0) {
            return back()->with('error', 'Tidak ada data registrasi untuk diexport');
        }

        return Excel::download(
            new RegistrationsExport($managedCategories),
            'registrations_' . now()->format('Ymd_His') . '.xlsx'
        );
    }
}
