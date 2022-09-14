import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ModalServiceService } from './modal-service.service';

describe('ModalServiceService', () => {
  let service: ModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
