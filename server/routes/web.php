<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/teams', [TeamController::class, 'index']); // Accessible by regular users
// });

// Client Register  
Route::get('/register', [UserController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [UserController::class, 'register'])->name('registerAccount');

Route::get('/login', [UserController::class, 'showLoginForm'])->name('login');
Route::post('/login', [UserController::class, 'login']);

// Route::get('/team/dashboard', [DashboardController::class, 'teamDashboard'])->name('team.dashboard');
// Route::get('/participant/dashboard', [DashboardController::class, 'participantDashboard'])->name('participant.dashboard');


// // Admin-specific routes
// Route::middleware('admin-auth')->group(function () {
//     Route::get('/admin/teams', [AdminController::class, 'viewAllTeams']);
//     Route::put('/admin/teams/{id}', [AdminController::class, 'updateTeam']);
//     Route::delete('/admin/teams/{id}', [AdminController::class, 'deleteTeam']);
// });