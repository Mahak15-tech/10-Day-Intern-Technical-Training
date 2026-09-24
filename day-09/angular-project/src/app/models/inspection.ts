export interface Inspection {
  id: number;
  facility_id: string;
  location?: string;
  facility_type?: string;

  cleanliness_score: number;
  odor_score: number;
  waste_level: number;
  water_availability: number;
  footfall: number;
  complaints: number;

  hygiene_risk?: string;
  predicted_risk?: string;
  risk_score?: number;

  inspection_date?: string;
  created_at?: string;
  confidence?: number;
}