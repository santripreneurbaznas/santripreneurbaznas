<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\{
    RegistrationController as AdminRegistrationController,
    UserController
};
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CkeditorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\SuperAdmin\AdminController;
use App\Http\Controllers\SuperAdmin\ManagementController;
use App\Http\Controllers\User\{
    ArticleUserController,
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
    return Inertia::render('Welcome');
});
Route::get('/pendaftaran', function () {
    return Inertia::render('Pendaftaran');
});
// Route::get('/klaster', function () {
//     return Inertia::render('Klaster');
// });
Route::get('/kompetisi', function () {
    return Inertia::render('Kompetisi');
});
Route::get('/announcement', function () {
    return Inertia::render('Announcement');
});
Route::fallback(function () {
    return Inertia::render('NotFound');
});


// Article
Route::get('/articles', [ArticleUserController::class, 'index'])->name('user.articles.index');
Route::get('/articles/search', [ArticleUserController::class, 'search'])->name('user.articles.search');
Route::get('/articles/category/{category}', [ArticleUserController::class, 'category'])->name('user.articles.category');
Route::get('/articles/{slug}', [ArticleUserController::class, 'show'])->name('user.articles.show');


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

        Route::get('/regist/export', [AdminRegistrationController::class, 'export_excel'])
            ->name('admin.registrations.export');
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


        // Registrations
        Route::get('/registrations/{registration}', [AdminRegistrationController::class, 'show'])->name('superadmin.registrations.show');


        // Maintenance
        Route::get('/maintenance', [MaintenanceController::class, 'index']);
        Route::post('/maintenance/down', [MaintenanceController::class, 'down']);
        Route::post('/maintenance/up', [MaintenanceController::class, 'up']);

        // Manage Articles
        Route::post('/ckeditor/upload', [CkeditorController::class, 'upload'])->name('ckeditor.upload');

        Route::get('/articles', [ArticleController::class, 'index'])->name('superadmin.articles.index');
        Route::get('/articles/create', [ArticleController::class, 'create'])->name('superadmin.articles.create');
        Route::post('/articles', [ArticleController::class, 'store'])->name('superadmin.articles.store');

        Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('superadmin.articles.edit');
        Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('superadmin.articles.update');

        Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('superadmin.articles.show');


        Route::post('/articles/category', [ArticleController::class, 'storeCategory'])->name('superadmin.articles.category.store');
    });

    // Export Exel
    Route::get('/user/export', [UserController::class, 'export_excel'])
        ->name('superadmin.users.export');
});










Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
