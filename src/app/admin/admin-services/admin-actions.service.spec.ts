import { TestBed } from '@angular/core/testing';

import { AdminActionsService } from '../../admin-actions.service';

describe('AdminActionService', () => {
  let service: AdminActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
