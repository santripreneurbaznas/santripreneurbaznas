<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementUserController extends Controller
{
    public function show($slug)
    {
        // Ambil kompetisi berdasarkan slug dengan eager loading
        $competition = Competition::where('slug', $slug)
            ->with(['categories' => function ($query) {
                $query->with(['announcements' => function ($q) {
                    $q->orderBy('top_type', 'desc'); // Urutkan dari Top 100 ke Top 10
                }]);
            }])
            ->first();



        if (!$competition) {
            // return Inertia::render('NotFound');
            // atau bisa redirect route khusus:
            return redirect('/announcements')->with('error', 'Competition not found.');
        }

        // Transform data untuk memudahkan grouping
        $competition->categories->transform(function ($category) {
            // Group announcements by top_type
            $category->announcements_by_top = $category->announcements->groupBy('top_type');

            // Hitung total announcements per kategori
            $category->total_announcements = $category->announcements->count();

            return $category;
        });

        // Hitung statistik total
        $totalAnnouncements = $competition->categories->sum('total_announcements');
        $totalCategories = $competition->categories->count();

        // dd($competition);

        return Inertia::render('User/Announcements/Show', [
            'competition' => $competition,
            'stats' => [
                'total_categories' => $totalCategories,
                'total_announcements' => $totalAnnouncements,
            ]
        ]);
    }

    // Method untuk list semua kompetisi
    public function index()
    {
        $competitions = Competition::where('is_active', false)
            ->withCount(['categories', 'categories as announcements_count' => function ($query) {
                $query->join('category_announcements', 'categories.id', '=', 'category_announcements.category_id');
            }])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($competition) {
                // Hitung statistik
                $totalAnnouncements = $competition->categories->sum(function ($category) {
                    return $category->announcements->count();
                });

                return [
                    'id' => $competition->id,
                    'name' => $competition->name,
                    'slug' => $competition->slug,
                    'description' => $competition->description,
                    'year' => $competition->created_at->format('Y'),
                    'logo_path' => "/images/logo.png",
                    'total_categories' => $competition->categories_count,
                    'total_announcements' => $totalAnnouncements,
                    'created_at' => $competition->created_at->format('Y-m-d'),
                    'updated_at' => $competition->updated_at->format('Y-m-d'),
                ];
            });



        return Inertia::render('User/Announcements/Index', [
            'competitions' => $competitions,
            'stats' => [
                'total_competitions' => $competitions->count(),
                'total_active' => $competitions->where('is_active', true)->count(),
            ]
        ]);
    }
}
