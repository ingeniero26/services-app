<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
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
Route::get('companies/{company}',[CompanyController::class,'show'])->name('companies.show');
Route::get('companies/{company}/edit',[CompanyController::class,'edit'])->name('companies.edit');
Route::put('companies/{company}',[CompanyController::class,'update'])->name('companies.update');
Route::delete('companies/{company}',[CompanyController::class,'destroy'])->name('companies.destroy');

//departmentos
Route::get('departments',[DepartmentController::class,'index'])->name('departments.index');
Route::get('departments/create',[DepartmentController::class,'create'])->name('departments.create');
Route::post('departments',[DepartmentController::class,'store'])->name('departments.store');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
