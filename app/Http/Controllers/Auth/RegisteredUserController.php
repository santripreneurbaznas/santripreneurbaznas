<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'nik' => 'required|string|unique:' . User::class,
            'no_wa' => ['nullable', 'string', 'max:20', 'unique:users,no_wa'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // dd($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => 3,
            'nik' => $request->nik,
            'no_wa' => $request->no_wa,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);
        $compe = Competition::where('is_active', true)->first();
        // return redirect(RouteServiceProvider::HOME)->with('success', 'Akun berhasil dibuat');
        return redirect("/user/competitions/{$compe->id}/register")
            ->with('success', 'Akun berhasil dibuat, Silahkan Lengkapi Pendaftaran Lomba');
    }
}
