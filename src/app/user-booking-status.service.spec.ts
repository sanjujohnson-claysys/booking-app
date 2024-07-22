import { TestBed } from '@angular/core/testing';

import { UserBookingStatusService } from './user/userService/user-booking-status.service';

describe('UserBookingStatusService', () => {
  let service: UserBookingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBookingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
