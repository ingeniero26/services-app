<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
        return Inertia::render('companies/index',[
            'companies' => Company::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('companies/create',[
            'company' => new Company()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'active' => 'boolean',
        ]);

        Company::create($validated);

        return redirect()->route('companies.index')->with('success', 'Empresa creada correctamente');
    }
    public function show(Company $company)
    {
        return Inertia::render('companies/show', [
            'company' => $company
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Inertia::render('companies/edit', [
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'active' => 'boolean',
        ]);

        $company->update($validated);

        return redirect()->route('companies.index')->with('success', 'Empresa actualizada correctamente');
    }

   public function destroy(Company $company)
{
    $company->delete();

    return redirect()->route('companies.index')->with('success', 'Empresa eliminada correctamente');
}

// Método details (puedes usar show como details, pero si quieres uno aparte)
public function details(Company $company)
{
    return Inertia::render('companies/details', [
        'company' => $company
    ]);
}
}
