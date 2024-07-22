import { TestBed } from '@angular/core/testing';

import { MarkWorkspaceUnavailableService } from '../admin/adminServices/mark-workspace-unavailable.service';

describe('MarkWorkspaceUnavailableService', () => {
  let service: MarkWorkspaceUnavailableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkWorkspaceUnavailableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
