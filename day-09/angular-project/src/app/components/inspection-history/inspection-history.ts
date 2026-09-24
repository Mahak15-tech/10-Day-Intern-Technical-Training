import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-inspection-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inspection-history.html',
  styleUrl: './inspection-history.css'
})
export class InspectionHistoryComponent implements OnInit {

  private facilityService = inject(FacilityService);

  inspections: any[] = [];
  filteredInspections: any[] = [];

  searchText = '';
  selectedRisk = 'All';

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.facilityService.getInspections().subscribe({
      next: (data) => {
        this.inspections = [...data].reverse();
        this.filteredInspections = this.inspections;
      },
      error: (error) => {
        console.error('Error loading inspection history:', error);
      }
    });
  }

  filterInspections(): void {
    const search = this.searchText.toLowerCase().trim();

    this.filteredInspections = this.inspections.filter(inspection => {

      const matchesSearch =
        !search ||
        inspection.facility_id?.toLowerCase().includes(search) ||
        inspection.location?.toLowerCase().includes(search);

      const risk =
        inspection.hygiene_risk ||
        inspection.predicted_risk ||
        '';

      const matchesRisk =
        this.selectedRisk === 'All' ||
        risk === this.selectedRisk;

      return matchesSearch && matchesRisk;
    });
  }
}