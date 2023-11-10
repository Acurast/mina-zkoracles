import { TestBed } from '@angular/core/testing';

import { OracleService } from './oracle.service';

describe('OracleService', () => {
  let service: OracleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OracleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
