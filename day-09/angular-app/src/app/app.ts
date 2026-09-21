import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService, Employee } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  ngOnInit(): void {
    (this.employeeService.getEmployees() as Observable<Employee[]>).subscribe({
      next: (data: Employee[]) => {
        this.employees = data as Employee[];
      },
      error: (error: unknown) => {
        console.error('Error fetching employees:', error);
      }
    });
  }
}