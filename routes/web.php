<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SectionController;
use App\Models\Country;
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
Route::get('sections',[SectionController::class,'index'])->name('sections.index');
Route::get('sections/create',[SectionController::class,'create'])->name('sections.create');
Route::post('sections',[SectionController::class,'store'])->name('sections.store');


// paises
Route::get('countries',[CountryController::class,'index'])->name('countries.index');
Route::get('countries/create',[CountryController::class,'create'])->name('countries.create');
Route::post('countries',[CountryController::class,'store'])->name('countries.store');
Route::get('countries/{country}',[CountryController::class,'show'])->name('countries.show');
Route::get('countries/{country}/edit',[CountryController::class,'edit'])->name('countries.edit');
Route::put('countries/{country}',[CountryController::class,'update'])->name('countries.update');
Route::delete('countries/{country}',[CountryController::class,'destroy'])->name('countries.destroy');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
