<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class AdminController extends Controller
{
    public function index()
    {
        $admins = User::where('role_id', 2)->with('managedCategories')->get();
        $categories = Category::where('is_active', true)->with('competition')->get();

        return inertia('SuperAdmin/AdminAccess/Index', [
            'admins' => $admins,
            'categories' => $categories
        ]);
    }


    public function updateAccess(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|exists:users,id',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id'
        ]);

        $admin = User::findOrFail($request->admin_id);
        $admin->managedCategories()->sync($request->category_ids);

        return back()->with('success', 'Hak akses berhasil diperbarui');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id'
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 2, // Role admin
            'nik' => null
        ]);

        // Attach categories
        if (!empty($request->category_ids)) {
            $admin->managedCategories()->sync($request->category_ids);
        }

        return back()->with('success', 'Admin berhasil dibuat dengan hak akses yang dipilih');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
