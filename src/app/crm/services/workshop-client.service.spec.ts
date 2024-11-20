import { TestBed } from '@angular/core/testing';

import { WorkshopClientService } from './workshop-client.service';

describe('WorkshopClientService', () => {
  let service: WorkshopClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
