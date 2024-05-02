import { TestBed } from '@angular/core/testing';

import { CommonErrorModalService } from './common-error-modal.service';

describe('CommonErrorModalService', () => {
  let service: CommonErrorModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonErrorModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
