import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDataByFiltersComponent } from './admin-booking-data-by-filters.component';

describe('AdminBookingDataByFiltersComponent', () => {
  let component: AdminBookingDataByFiltersComponent;
  let fixture: ComponentFixture<AdminBookingDataByFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookingDataByFiltersComponent]
    });
    fixture = TestBed.createComponent(AdminBookingDataByFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
