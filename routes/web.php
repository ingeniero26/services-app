<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// empresas
Route::get('companies',[CompanyController::class,'index'])->name('companies.index');;
Route::get('companies/create',[CompanyController::class,'create'])->name('companies.create');
Route::post('companies',[CompanyController::class,'store'])->name('companies.store');
Route::get('companies/{id}',[CompanyController::class,'show'])->name('companies.show');
Route::get('companies/{id}/edit',[CompanyController::class,'edit'])->name('companies.edit');
Route::patch('companies/{id}',[CompanyController::class,'update'])->name('companies.update');
Route::delete('companies/{id}',[CompanyController::class,'destroy'])->name('companies.destroy');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
