import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsByIdComponent } from './booking-details-by-id.component';

describe('BookingDetailsByIdComponent', () => {
  let component: BookingDetailsByIdComponent;
  let fixture: ComponentFixture<BookingDetailsByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingDetailsByIdComponent]
    });
    fixture = TestBed.createComponent(BookingDetailsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
