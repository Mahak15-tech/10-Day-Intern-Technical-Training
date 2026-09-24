import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionHistoryComponent } from './inspection-history';

describe('InspectionHistory', () => {
  let component: InspectionHistoryComponent;
  let fixture: ComponentFixture<InspectionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InspectionHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
