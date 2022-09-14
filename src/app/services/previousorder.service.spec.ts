import { TestBed } from '@angular/core/testing';

import { PreviousorderService } from './previousorder.service';

describe('PreviousorderService', () => {
  let service: PreviousorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
