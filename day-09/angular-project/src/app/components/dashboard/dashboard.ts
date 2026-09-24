import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  private facilityService = inject(FacilityService);
  private cdr = inject(ChangeDetectorRef);

  facilities: any[] = [];
  inspections: any[] = [];

  totalFacilities = 0;
  totalInspections = 0;

  lowRisk = 0;
  mediumRisk = 0;
  highRisk = 0;


  ngOnInit(): void {
    this.loadDashboard();
  }


  loadDashboard(): void {

    // FACILITIES
    this.facilityService.getFacilities().subscribe({

      next: (data) => {

        console.log('Dashboard facilities:', data);

        this.facilities = data;
        this.totalFacilities = data.length;

        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Dashboard facilities error:', error);
      }

    });


    // INSPECTIONS
    this.facilityService.getInspections().subscribe({

      next: (data) => {

        console.log('Dashboard inspections:', data);

        this.inspections = [...data].reverse();

        this.totalInspections = data.length;


        this.lowRisk = data.filter(
          item =>
            (item.hygiene_risk || item.predicted_risk) === 'Low'
        ).length;


        this.mediumRisk = data.filter(
          item =>
            (item.hygiene_risk || item.predicted_risk) === 'Medium'
        ).length;


        this.highRisk = data.filter(
          item =>
            (item.hygiene_risk || item.predicted_risk) === 'High'
        ).length;


        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Dashboard inspections error:', error);
      }

    });

  }

}