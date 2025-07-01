<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users =  User::where('role_id', 3)->with(['role', 'managedCategories', 'registrations.competition', 'registrations.category'])->when($request->search, function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        })
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        $roles = Role::all();
        $categories = Category::all();

        // dd($users);

        // dd($test);
        return Inertia::render('SuperAdmin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'categories' => $categories,
            'filters' => $request->only(['search'])
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role_id' => 'required|exists:roles,id',
            'category_ids' => 'nullable|array', // Tambahkan validasi untuk category_ids
            'category_ids.*' => 'exists:categories,id'
        ]);

        $user =   User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);

        if ($request->role_id == 2 && !empty($request->category_ids)) {
            $user->managedCategories()->sync($request->category_ids);
        }

        return redirect()->route('users.index');
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
    public function update(Request $request, User $user)
    {



        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role_id' => 'required|exists:roles,id'
        ]);


        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id
        ]);


        // Jika user adalah admin, update hak akses kategori
        if ($request->role_id == 2) { // Anggap role_id 2 adalah admin
            $user->managedCategories()->sync($request->category_ids ?? []);
        }

        if ($request->password) {
            $request->validate([
                'password' => ['confirmed', Rules\Password::defaults()],
            ]);
            $user->update(['password' => Hash::make($request->password)]);
        }


        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        // Prevent superadmin from deleting themselves
        if ($user->isSuperAdmin() && $user->id === auth()->id()) {
            return back()->withErrors(['message' => 'You cannot delete your own superadmin account.']);
        }
        $user->delete();
        return redirect()->route('users.index');
    }
}
