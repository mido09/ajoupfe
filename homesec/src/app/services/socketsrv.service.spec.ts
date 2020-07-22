import { TestBed } from '@angular/core/testing';

import { SocketsrvService } from './socketsrv.service';

describe('SocketsrvService', () => {
  let service: SocketsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
