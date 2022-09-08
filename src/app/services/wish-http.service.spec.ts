import { TestBed } from '@angular/core/testing';

import { WishHttpService } from './wish-http.service';

describe('WishHttpService', () => {
  let service: WishHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
