import { TestBed } from '@angular/core/testing';

import { FetchEmployeeIdsService } from './fetch-employee-ids.service';

describe('FetchEmployeeIdsService', () => {
  let service: FetchEmployeeIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchEmployeeIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
