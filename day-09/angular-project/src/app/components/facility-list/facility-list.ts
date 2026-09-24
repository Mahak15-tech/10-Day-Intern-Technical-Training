import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-facility-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './facility-list.html',
  styleUrl: './facility-list.css'
})
export class FacilityListComponent implements OnInit {

  private facilityService = inject(FacilityService);

  facilities: any[] = [];
  filteredFacilities: any[] = [];

  searchText = '';
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {

    this.loading = true;
    this.errorMessage = '';

    this.facilityService.getFacilities().subscribe({

      next: (data) => {

        console.log('Facilities loaded:', data);

        this.facilities = data;
        this.filteredFacilities = data;

        this.loading = false;
      },

      error: (error) => {

        console.error('Error loading facilities:', error);

        this.loading = false;
        this.errorMessage =
          'Unable to load facilities. Make sure the Day 9 API is running.';
      }

    });
  }

  searchFacilities(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredFacilities = this.facilities.filter(
      facility =>
        facility.facility_id
          ?.toLowerCase()
          .includes(search) ||

        facility.location
          ?.toLowerCase()
          .includes(search)
    );
  }
}