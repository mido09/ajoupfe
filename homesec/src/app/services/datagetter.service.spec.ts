import { TestBed } from '@angular/core/testing';

import { DatagetterService } from './datagetter.service';

describe('DatagetterService', () => {
  let service: DatagetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
