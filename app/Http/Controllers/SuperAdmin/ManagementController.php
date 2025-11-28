<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Competition;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\WinnersExport;
use App\Models\User;
use Illuminate\Support\Str;

class ManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Menampilkan halaman management
    public function index()
    {
        $competitions = Competition::with('categories')->get();
        return inertia('SuperAdmin/Management/Index', [
            'competitions' => $competitions,
        ]);
    }

    // Kategori
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'competition_id' => 'required|exists:competitions,id',
        ]);

        Category::create($request->only(['name', 'description', 'competition_id']));

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'competition_id' => 'required|exists:competitions,id',
        ]);

        $category->update($request->only(['name', 'description', 'competition_id']));

        return redirect()->back()->with('success', 'Category updated successfully.');
    }


    public function toggleCategoryStatus(Category $category)
    {
        $category->update(['is_active' => !$category->is_active]);
        return redirect()->back()->with('success', 'Category status updated.');
    }


    // Kompetisi
    public function storeCompetition(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        Competition::create($request->only(['name', 'description', 'start_date', 'end_date']));

        return redirect()->back()->with('success', 'Competition created successfully.');
    }

    public function updateCompetition(Request $request, Competition $competition)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $competition->update($request->only(['name', 'description', 'start_date', 'end_date']));

        return redirect()->back()->with('success', 'Competition updated successfully.');
    }

    public function toggleCompetitionStatus(Competition $competition)
    {
        $competition->update(['is_active' => !$competition->is_active]);
        return redirect()->back()->with('success', 'Competition status updated.');
    }


    public function setWinners(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'winners' => 'required|array',
            'winners.*' => 'exists:registrations,id',
        ]);

        Log::info($request->all());

        // Reset semua pemenang di kategori ini
        Registration::where('category_id', $request->category_id)
            ->update(['is_winner' => false]);

        // Set pemenang baru
        Registration::whereIn('id', $request->winners)
            ->update(['is_winner' => true]);

        return back()->with('success', 'Pemenang berhasil ditetapkan.');
    }

    public function searchParticipants(Request $request)
    {
        $request->validate([
            'nik' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $participants = Registration::with(['user', 'category'])
            ->where('category_id', $request->category_id)
            ->whereHas('user', function ($query) use ($request) {
                $query->where('nik', 'like', '%' . $request->nik . '%');
            })
            ->where('is_winner', false) // Hanya yang belum jadi pemenang
            ->get();

        return response()->json($participants);
    }

    public function bulkSearch(Request $request)
    {
        $request->validate([
            'niks' => 'required|array',
            'niks.*' => 'string|size:16',
            'category_id' => 'required|exists:categories,id'
        ]);

        $niks = $request->niks;

        // Cari user berdasarkan NIK
        $users = User::whereIn('nik', $niks)->get();

        // Cari registrations berdasarkan user_id dan category_id
        $found = [];
        $notFound = [];

        foreach ($niks as $nik) {
            $user = $users->where('nik', $nik)->first();

            if ($user) {
                $registration = Registration::with(['user', 'category'])
                    ->where('user_id', $user->id)
                    ->where('category_id', $request->category_id)
                    ->first();

                if ($registration) {
                    $found[] = $registration;
                } else {
                    $notFound[] = $nik;
                }
            } else {
                $notFound[] = $nik;
            }
        }

        return response()->json([
            'found' => $found,
            'not_found' => $notFound
        ]);
    }

    public function getWinnersByCategory($categoryId)
    {
        $winners = Registration::with(['user', 'category'])
            ->where('category_id', $categoryId)
            ->where('is_winner', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($winners);
    }

    /**
     * Export winners to Excel
     */
    public function exportWinners($categoryId)
    {
        $category = Category::findOrFail($categoryId);

        return Excel::download(
            new WinnersExport($categoryId),
            'pemenang-' .  Str::slug($category->name) . '-' . now()->format('Y-m-d') . '.xlsx'
        );
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
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
