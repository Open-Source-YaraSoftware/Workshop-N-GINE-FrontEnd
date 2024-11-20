import { TestBed } from '@angular/core/testing';

import { TaskProductUsageService } from './task-product-usage.service';

describe('TaskProductUsageService', () => {
  let service: TaskProductUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProductUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
