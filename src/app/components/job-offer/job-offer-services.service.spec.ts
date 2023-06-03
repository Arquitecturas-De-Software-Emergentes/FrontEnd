import { TestBed } from '@angular/core/testing';

import { JobOfferServicesService } from './job-offer-services.service';

describe('JobOfferServicesService', () => {
  let service: JobOfferServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobOfferServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
