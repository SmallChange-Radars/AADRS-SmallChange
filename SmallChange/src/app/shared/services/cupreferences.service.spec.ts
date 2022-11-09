import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CupreferencesService } from './cupreferences.service';

describe('CupreferencesService', () => {
  let service: CupreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CupreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
