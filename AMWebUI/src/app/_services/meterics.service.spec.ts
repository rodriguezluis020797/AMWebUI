import { TestBed } from '@angular/core/testing';

import { MetericsService } from './meterics.service';

describe('MetericsService', () => {
  let service: MetericsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetericsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
