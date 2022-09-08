import { TestBed } from '@angular/core/testing';

import { CupreferencesService } from './cupreferences.service';

describe('CupreferencesService', () => {
  let service: CupreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CupreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
