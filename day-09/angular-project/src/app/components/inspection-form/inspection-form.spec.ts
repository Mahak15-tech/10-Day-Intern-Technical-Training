import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionFormComponent } from './inspection-form';

describe('InspectionForm', () => {
  let component: InspectionFormComponent;
  let fixture: ComponentFixture<InspectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
