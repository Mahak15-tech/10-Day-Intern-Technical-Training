import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { FacilityListComponent } from './components/facility-list/facility-list';
import { InspectionFormComponent } from './components/inspection-form/inspection-form';
import { InspectionHistoryComponent } from './components/inspection-history/inspection-history';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'facilities',
    component: FacilityListComponent
  },
  {
    path: 'inspection',
    component: InspectionFormComponent
  },
  {
    path: 'history',
    component: InspectionHistoryComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];