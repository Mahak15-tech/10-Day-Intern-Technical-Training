import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';import {
  EmployeeService,
  Employee,
  HygieneData,
  PredictionResult
} from './services/employee.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  hygieneData: HygieneData = {
    cleanliness_score: 5,
    odor_score: 5,
    waste_level: 50,
    complaints: 2,
    footfall: 100,
    hours_since_cleaning: 24
  };

  prediction: PredictionResult | null = null;
  predictionError = '';

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  predictRisk(): void {
    this.prediction = null;
    this.predictionError = '';

    this.employeeService.predictHygieneRisk(this.hygieneData).subscribe({
      next: (result) => {
        this.prediction = result;
      },
      error: (error) => {
        console.error('Prediction error:', error);
        this.predictionError = 'Unable to predict hygiene risk.';
      }
    });
  }
}