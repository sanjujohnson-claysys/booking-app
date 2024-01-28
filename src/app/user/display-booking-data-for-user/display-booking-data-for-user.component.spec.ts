import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBookingDataForUserComponent } from './display-booking-data-for-user.component';

describe('DisplayBookingDataForUserComponent', () => {
  let component: DisplayBookingDataForUserComponent;
  let fixture: ComponentFixture<DisplayBookingDataForUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBookingDataForUserComponent]
    });
    fixture = TestBed.createComponent(DisplayBookingDataForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
