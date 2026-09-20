<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    // Get all employees
    public function index()
    {
        return response()->json(Employee::all());
    }

    // Add a new employee
    public function store(Request $request)
    {
        $employee = Employee::create($request->all());

        return response()->json($employee, 201);
    }

    // Get one employee
    public function show(Employee $employee)
    {
        return response()->json($employee);
    }

    // Update employee
    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->all());

        return response()->json($employee);
    }

    // Delete employee
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully'
        ]);
    }
}