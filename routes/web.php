<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\{
    RegistrationController as AdminRegistrationController,
    UserController
};
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SuperAdmin\AdminController;
use App\Http\Controllers\SuperAdmin\ManagementController;
use App\Http\Controllers\User\{
    CompetitionController as UserCompetitionController,
    RegistrationController as UserRegistrationController
};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/pendaftaran', function () {
    return Inertia::render('Pendaftaran');
});
Route::get('/klaster', function () {
    return Inertia::render('Klaster');
});
Route::get('/kompetisi', function () {
    return Inertia::render('Kompetisi');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // User routes
    Route::prefix('user')->group(function () {
        Route::get('/competitions', function () {
            return Inertia::render('Competitions/Index');
        })->name('competitions.index');

        Route::get('/competitions/{competition}/register', [UserCompetitionController::class, 'showRegistrationForm'])
            ->name('user.competitions.register');
        Route::post('/registrations', [UserRegistrationController::class, 'store'])
            ->name('user.registrations.store');

        Route::get('/my-registrations', [UserRegistrationController::class, 'index'])->name('user.registrations.index');
        Route::get('/my-registrations/{registration}', [UserRegistrationController::class, 'show'])
            ->middleware(['auth'])
            ->name('user.registrations.show');
        Route::get('/my-registrations/{registration}/edit', [UserRegistrationController::class, 'edit'])->name('user.registrations.edit');
        Route::patch('/my-registrations/{registration}', [UserRegistrationController::class, 'update'])->name('user.registrations.update');
        Route::delete('/my-registrations/{registration}', [UserRegistrationController::class, 'destroy'])->name('user.registrations.destroy');
    });

    // Admin routes
    Route::prefix('admin')->middleware('admin')->group(function () {

        Route::get('/registrations', [AdminRegistrationController::class, 'index'])->name('admin.registrations.index');
        Route::get('/registrations/{registration}', [AdminRegistrationController::class, 'show'])->name('admin.registrations.show');
        Route::put('/registrations/{registration}', [AdminRegistrationController::class, 'update'])->name('admin.registrations.update');
    });

    // Super Admin routes
    Route::prefix('super-admin')->middleware('superadmin')->group(function () {

        Route::resource('users', UserController::class);

        Route::get('/admin-access', [AdminController::class, 'index'])->name('superadmin.admin-access.index');
        Route::post('/admin-access', [AdminController::class, 'updateAccess'])->name('superadmin.admin-access.update');
        Route::post('/admin-access/create', [AdminController::class, 'store'])->name('superadmin.admin-access.store');

        Route::get('/management', [ManagementController::class, 'index'])->name('superadmin.management.index');

        // Categories
        Route::post('/categories', [ManagementController::class, 'storeCategory'])->name('superadmin.categories.store');
        Route::put('/categories/{category}', [ManagementController::class, 'updateCategory'])->name('superadmin.categories.update');
        Route::patch('/categories/{category}/toggle-status', [ManagementController::class, 'toggleCategoryStatus'])->name('superadmin.categories.toggle-status');

        // Competitions
        Route::post('/competitions', [ManagementController::class, 'storeCompetition'])->name('superadmin.competitions.store');
        Route::put('/competitions/{competition}', [ManagementController::class, 'updateCompetition'])->name('superadmin.competitions.update');
        Route::patch('/competitions/{competition}/toggle-status', [ManagementController::class, 'toggleCompetitionStatus'])->name('superadmin.competitions.toggle-status');
    });
});









Route::get('/testlogin', function () {
    return Inertia::render('Login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
