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
        $user = auth()->user();

        // 1. Cek apakah user pernah MENANG di kompetisi manapun
        $hasEverWon = Registration::where('user_id', $user->id)
            ->where('is_winner', true)
            ->exists();

        if ($hasEverWon) {
            return redirect()->route('user.registrations.index')
                ->with('error', 'Anda sudah pernah menjadi pemenang dan tidak dapat mengikuti lomba lagi.');
        }

        // 2. Cek apakah user sudah daftar pada kompetisi ini
        $alreadyRegistered = Registration::where('user_id', $user->id)
            ->where('competition_id', $competition->id)
            ->exists();

        if ($alreadyRegistered) {
            return redirect()->route('user.registrations.index')
                ->with('error', 'Anda sudah terdaftar di lomba ini.');
        }

        // 3. Cek apakah kompetisi masih aktif
        $competitionActive = $competition->is_active;

        if (!$competitionActive) {
            return redirect()->back()->with('error', 'Lomba sudah tidak tersedia.');
        }

        // 4. Ambil kategori aktif
        $categories = $competition->categories()
            ->where('is_active', true)
            ->get();

        return Inertia::render('User/Competitions/Register', [
            'competition' => $competition,
            'categories'  => $categories,
            'user'        => $user
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
