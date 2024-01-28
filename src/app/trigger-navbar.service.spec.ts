import { TestBed } from '@angular/core/testing';

import { TriggerNavbarService } from './trigger-navbar.service';

describe('TriggerNavbarService', () => {
  let service: TriggerNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriggerNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
