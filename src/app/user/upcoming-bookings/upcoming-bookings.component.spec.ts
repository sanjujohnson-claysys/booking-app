import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingBookingsComponent } from './upcoming-bookings.component';

describe('UpcomingBookingsComponent', () => {
  let component: UpcomingBookingsComponent;
  let fixture: ComponentFixture<UpcomingBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingBookingsComponent]
    });
    fixture = TestBed.createComponent(UpcomingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
