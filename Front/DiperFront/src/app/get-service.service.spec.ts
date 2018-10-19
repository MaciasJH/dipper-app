import { TestBed } from '@angular/core/testing';

import { GetServiceService } from './get-service.service';

describe('GetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetServiceService = TestBed.get(GetServiceService);
    expect(service).toBeTruthy();
  });
});
