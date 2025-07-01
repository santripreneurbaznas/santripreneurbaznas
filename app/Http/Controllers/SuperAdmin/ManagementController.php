<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
