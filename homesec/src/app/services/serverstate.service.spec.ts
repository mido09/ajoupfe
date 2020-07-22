import { TestBed } from '@angular/core/testing';

import { ServerstateService } from './serverstate.service';

describe('ServerstateService', () => {
  let service: ServerstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
