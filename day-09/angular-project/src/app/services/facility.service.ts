import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Facility } from '../models/facility';
import { Inspection } from '../models/inspection';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:5002/api';

  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(
      `${this.apiUrl}/facilities`
    );
  }

  getFacility(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/facilities/${id}`
    );
  }

  getInspections(facilityId?: string): Observable<Inspection[]> {
    const url = facilityId
      ? `${this.apiUrl}/inspections?facility_id=${facilityId}`
      : `${this.apiUrl}/inspections`;

    return this.http.get<Inspection[]>(url);
  }

  predictRisk(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/inspections`,
      data
    );
  }
}