<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Registration;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        // dd(auth()->user()->role_id);

        if (auth()->user()->role_id === 1) {
            $categories = Category::where('is_active', true)
                ->withCount('registrations')
                ->get();

            // Ambil data untuk chart (registrasi per minggu per kategori)
            $weeklyData = [];
            $currentMonth = now()->month;
            $currentYear = now()->year;

            // Get all weeks in current month
            $startDate = now()->startOfMonth();
            $endDate = now()->endOfMonth();

            $weeks = [];
            while ($startDate <= $endDate) {
                $weekNumber = $startDate->weekOfMonth;
                $weeks["Minggu {$weekNumber}"] = [
                    'start' => $startDate->copy()->startOfWeek(),
                    'end' => $startDate->copy()->endOfWeek()
                ];
                $startDate->addWeek();
            }

            // Prepare data structure
            foreach ($categories as $category) {
                $categoryData = [
                    'name' => $category->name,
                    'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)), // Random color
                    'data' => []
                ];

                foreach ($weeks as $weekLabel => $weekRange) {
                    $count = Registration::where('category_id', $category->id)
                        ->whereBetween('created_at', [$weekRange['start'], $weekRange['end']])
                        ->count();

                    $categoryData['data'][$weekLabel] = $count;
                }

                $weeklyData[] = $categoryData;
            }

            return Inertia::render(
                'SuperAdmin/Dashboard',
                [
                    'categories' => $categories,
                    'chartData' => [
                        'weeks' => array_keys($weeks),
                        'series' => $weeklyData
                    ]
                ]
            );
        }



        if (auth()->user()->role_id === 2) {
            $managedCategories = auth()->user()->managedCategories()->pluck('categories.id');

            if ($managedCategories->isEmpty()) {
                return Inertia::render('SuperAdmin/Dashboard', [
                    'categories' => [],
                    'chartData' => [
                        'weeks' => [],
                        'series' => []
                    ]
                ]);
            }

            $categories = auth()->user()
                ->managedCategories()
                ->where('is_active', true)
                ->with(['competition'])
                ->withCount('registrations')
                ->get();



            // Ambil data untuk chart (registrasi per minggu per kategori)
            $weeklyData = [];
            $currentMonth = now()->month;
            $currentYear = now()->year;

            // Get all weeks in current month
            $startDate = now()->startOfMonth();
            $endDate = now()->endOfMonth();

            $weeks = [];

            while ($startDate <= $endDate) {
                $weekNumber = $startDate->weekOfMonth;
                $weeks["Minggu {$weekNumber}"] = [
                    'start' => $startDate->copy()->startOfWeek(),
                    'end' => $startDate->copy()->endOfWeek()
                ];
                $startDate->addWeek();
            }

            // Prepare data structure
            foreach ($categories as $category) {
                $categoryData = [
                    'name' => $category->name,
                    'color' => sprintf('#%06X', mt_rand(0, 0xFFFFFF)), // Random color
                    'data' => []
                ];

                foreach ($weeks as $weekLabel => $weekRange) {
                    $count = Registration::where('category_id', $category->id)
                        ->whereBetween('created_at', [$weekRange['start'], $weekRange['end']])
                        ->count();

                    $categoryData['data'][$weekLabel] = $count;
                }

                $weeklyData[] = $categoryData;
            }


            return Inertia::render(
                'SuperAdmin/Dashboard',
                [
                    'categories' => $categories,
                    'chartData' => [
                        'weeks' => array_keys($weeks),
                        'series' => $weeklyData
                    ]
                ]
            );
        }

        $user = Auth::user();

        $registrationsCount = $user->registrations()->count();

        // Ambil 5 pendaftaran terbaru beserta data kompetisi
        $recentRegistrations = $user->registrations()
            ->with(['competition:id,name', 'category:id,name'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'competition_id', 'category_id', 'status', 'created_at']);

        // Format data untuk aktivitas terkini
        $recentActivities = $recentRegistrations->map(function ($registration) {
            return [
                'type' => 'registration',
                'competition_name' => $registration->competition->name,
                'category_name' => $registration->category->name,
                'status' => $registration->status,
                'date' => $registration->created_at,
                'formatted_date' => Carbon::parse($registration->created_at)->diffForHumans(),
            ];
        });

        return Inertia::render('Dashboard', [
            'registrationsCount' => $registrationsCount,
            'recentActivities' => $recentActivities
        ]);

        return Inertia::render('Dashboard', [
            'registrationsCount' => $registrationsCount
        ]);
    }
}
