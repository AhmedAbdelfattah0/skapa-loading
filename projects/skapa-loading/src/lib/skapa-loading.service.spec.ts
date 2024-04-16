import { TestBed } from '@angular/core/testing';

import { SkapaLoadingService } from './skapa-loading.service';

describe('SkapaLoadingService', () => {
  let service: SkapaLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkapaLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
