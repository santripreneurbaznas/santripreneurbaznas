<?php

// app/Http/Controllers/CompetitionAnnouncementController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Competition;
use App\Models\CategoryAnnouncement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CompetitionAnnouncementController extends Controller
{
    public function index()
    {
        // Load semua kompetisi dengan kategori dan pengumuman
        $competitions = Competition::with(['categories.announcements'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->transform(function ($competition) {
                // Normalisasi URL untuk setiap pengumuman
                $competition->categories->transform(function ($category) {
                    $category->announcements->transform(function ($ann) {
                        $ann->public_url = $this->toPublicUrl($ann->file_path);
                        return $ann;
                    });
                    return $category;
                });

                // Hitung total pengumuman per kompetisi
                $competition->total_announcements = $competition->categories->sum(function ($category) {
                    return $category->announcements->count();
                });

                return $competition;
            });

        // Ambil semua kategori untuk form (jika perlu)
        $allCategories = Category::with('competition')
            ->orderBy('name')
            ->get();


        return Inertia::render('SuperAdmin/Announcements/Index', [
            'competitions' => $competitions,
            'categories' => $allCategories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'top_type' => ['required', 'in:100,50,10'],
            'file_path' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,xlsx,xls,csv,ods']
        ]);

        // Load category
        $category = Category::with('competition')->findOrFail($data['category_id']);

        // Timestamp
        $timestamp = now()->format('Y-m-d-H-i-s');


        // Handle file upload
        if ($request->hasFile('file')) {

            $ext = $request->file('file')->getClientOriginalExtension();

            // Nama file baru
            $filename = strtolower(
                $category->competition->name . '-' .
                    $category->name . '-top' . $data['top_type'] . '-' . $timestamp . '.' . $ext
            );

            $path = $request->file('file')->storeAs(
                'announcements',   // folder
                $filename,         // filename
                'public'           // disk
            );

            $data['file_path'] = $path;
        }

        CategoryAnnouncement::create([
            'category_id' => $data['category_id'],
            'top_type' => $data['top_type'],
            'file_path' => $data['file_path'] ?? '',
        ]);

        return redirect('/super-admin/announcements')
            ->with('success', 'Pengumuman berhasil dibuat');
    }



    public function edit(CategoryAnnouncement $announcement)
    {
        $announcement->load('category.competition');
        $announcement->public_url = $this->toPublicUrl($announcement->file_path);

        // Ambil semua kompetisi untuk konteks
        $competitions = Competition::with(['categories'])->get();
        $categories = Category::with('competition')->get();

        return inertia('SuperAdmin/Announcements/Index', [
            'competitions' => $competitions,
            'categories' => $categories,
            'editing' => $announcement
        ]);
    }

    public function update(Request $request, CategoryAnnouncement $announcement)
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'top_type' => ['required', 'in:100,50,10'],
            'file_path' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,xlsx,xls,csv,ods']
        ]);

        $category = Category::with('competition')->findOrFail($data['category_id']);
        $timestamp = now()->format('Y-m-d-H-i-s');

        if ($request->hasFile('file')) {

            // Hapus file lama
            if ($announcement->file_path && Storage::disk('public')->exists($announcement->file_path)) {
                Storage::disk('public')->delete($announcement->file_path);
            }

            $ext = $request->file('file')->getClientOriginalExtension();

            $filename = strtolower(
                $category->competition->slug . '-' .
                    $category->slug . '-top' . $data['top_type'] . '-' . $timestamp . '.' . $ext
            );

            $path = $request->file('file')->storeAs(
                'announcements',
                $filename,
                'public'
            );

            $data['file_path'] = $path;
        }

        // Update record
        $announcement->update([
            'category_id' => $data['category_id'],
            'top_type' => $data['top_type'],
            'file_path' => $data['file_path'] ?? $announcement->file_path,
        ]);

        return redirect("/super-admin/announcements")
            ->with('success', 'Pengumuman berhasil diupdate');
    }



    public function destroy(CategoryAnnouncement $announcement)
    {
        // Hapus file fisik jika ada
        if ($announcement->file_path && Storage::disk('public')->exists($announcement->file_path)) {
            Storage::disk('public')->delete($announcement->file_path);
        }

        $announcement->delete();

        return redirect()->route('global.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus');
    }

    // Helper: normalize public url
    protected function toPublicUrl($filePath)
    {
        if (!$filePath) return null;

        if (filter_var($filePath, FILTER_VALIDATE_URL)) {
            return $filePath;
        }

        if (Storage::disk('public')->exists($filePath)) {
            return asset('storage/' . $filePath);
        }

        return asset("storage/{$filePath}");
    }
}
