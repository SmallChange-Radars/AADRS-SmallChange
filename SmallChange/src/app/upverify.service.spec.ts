import { fakeAsync, inject, TestBed } from '@angular/core/testing';

import { UpverifyService } from './upverify.service';

describe('UpverifyService', () => {
  let service: UpverifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpverifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true with correct credntials', inject([UpverifyService], fakeAsync((service: UpverifyService) => {
    expect(service.verifyUSER("a000007@fmr.com","ItsASecret101")).toBe(true);
  })));

  it('should return false with incorrect credntials', inject([UpverifyService], fakeAsync((service: UpverifyService) => {
    expect(service.verifyUSER("a000007@fmr.com","ItsASecet101")).toBe(false);
  })));
});
