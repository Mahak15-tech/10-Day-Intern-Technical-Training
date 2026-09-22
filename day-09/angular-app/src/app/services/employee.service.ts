import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  email: string;
}

export interface HygieneData {
  cleanliness_score: number;
  odor_score: number;
  waste_level: number;
  complaints: number;
  footfall: number;
  hours_since_cleaning: number;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/employees';
  private mlApiUrl = 'http://127.0.0.1:5001/predict';

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  predictHygieneRisk(
    data: HygieneData
  ): Observable<PredictionResult> {
    return this.http.post<PredictionResult>(
      this.mlApiUrl,
      data
    );
  }
}