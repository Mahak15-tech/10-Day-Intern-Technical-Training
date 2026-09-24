import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacilityService } from '../../services/facility.service';

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionFormComponent {

  private facilityService = inject(FacilityService);

  formData = {
    facility_id: '',
    cleanliness_score: 5,
    odor_score: 5,
    waste_level: 50,
    water_availability: 1,
    footfall: 100,
    complaints: 0
  };

  prediction = '';
  confidence = 0;
  submitted = false;
  loading = false;
  errorMessage = '';

  predictRisk(): void {
  console.log('Assessment started');

  this.loading = true;
  this.submitted = false;
  this.errorMessage = '';

  const cleanliness = Number(this.formData.cleanliness_score);
  const odor = Number(this.formData.odor_score);
  const waste = Number(this.formData.waste_level);
  const water = Number(this.formData.water_availability);
  const footfall = Number(this.formData.footfall);
  const complaints = Number(this.formData.complaints);

  let riskScore = 0;

  if (cleanliness < 5) {
    riskScore += 3;
  } else if (cleanliness < 7) {
    riskScore += 1;
  }

  if (odor > 7) {
    riskScore += 3;
  } else if (odor > 5) {
    riskScore += 1;
  }

  if (waste > 70) {
    riskScore += 3;
  } else if (waste > 40) {
    riskScore += 1;
  }

  if (water === 0) {
    riskScore += 2;
  }

  if (footfall > 500) {
    riskScore += 1;
  }

  if (complaints > 5) {
    riskScore += 2;
  } else if (complaints > 2) {
    riskScore += 1;
  }

  if (riskScore >= 7) {
    this.prediction = 'High';
  } else if (riskScore >= 4) {
    this.prediction = 'Medium';
  } else {
    this.prediction = 'Low';
  }

  this.confidence = 0;
  this.submitted = true;
  this.loading = false;

  // Save the assessment through the Day 9 backend
  this.facilityService.predictRisk(this.formData).subscribe({
    next: (result) => {
      console.log('Assessment saved:', result);
    },
    error: (error) => {
      console.error('Backend save error:', error);
    }
  });
}
}