<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Section;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // mostrar los departamento con la empresa
        $departments = Section::with('company')->get();
        return Inertia::render('sections/index', [
        'sections' => $departments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
   public function create()
    {
        $companies = \App\Models\Company::where('active', true)->get(['id', 'name', 'code']);
        
        return Inertia::render('sections/create', [
            'companies' => $companies
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
        {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'company_id' => 'required|exists:companies,id',
                'code'=> 'nullable|string|max:255',
                'description'=> 'nullable|string|max:255',
                'manager' => 'nullable|string|max:255',
                'active' => 'boolean',
            ]);

            Section::create($validated);

            return redirect()->route('sections.index')->with('success', 'Departamento creado correctamente');
        }
    /**
     * Display the specified resource.
     */
    public function show(Section $department)
    {
        return Inertia::render('sections/show', [
            'department' => $department->load('company')
        ]);
    }

public function edit(Section $department)
    {
        return Inertia::render('sections/edit', [
            'department' => $department->load('company')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company_id' => 'required|exists:companies,id',
        ]);

        $department->update($validated);

        return redirect()->route('sections.index')->with('success', 'Departamento actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $department)
    {
        $department->delete();

        return redirect()->route('sections.index')->with('success', 'Departamento eliminado correctamente');
    }
}
