<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Competition;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetitionController extends Controller
{
    public function showRegistrationForm(Competition $competition)
    {
        // Cek apakah user sudah mendaftar di lomba ini
        $alreadyRegistered = Registration::where('user_id', auth()->id())
            ->where('competition_id', $competition->id)
            ->exists();

        if ($alreadyRegistered) {
            return redirect()->route('user.registrations.index')->with('error', 'Anda sudah terdaftar di lomba ini');
        }

        $categories = $competition->categories()->where('is_active', true)->get();

        return Inertia::render('User/Competitions/Register', [
            'competition' => $competition,
            'categories' => $categories,
        ]);
    }
    public function index()
    {
        //
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
