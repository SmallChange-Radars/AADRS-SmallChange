import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';

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

  it('should return an object with correct credntials', inject(
    [UpverifyService],
    fakeAsync((service: UpverifyService) => {
      let id: ClientIdentification = new ClientIdentification('SSN', '!@_NM');
      let client: Client = new Client(
        '1234',
        'aadrs@gmail.com',
        '01/01/1990',
        'USA',
        '123456',
        [id],
        false
      );
      expect(service.verifyUSER('aadrs@gmail.com', 'ItsASecret101')).toEqual(
        client
      );
    })
  ));

  it('should return false with incorrect credntials', inject(
    [UpverifyService],
    fakeAsync((service: UpverifyService) => {
      expect(service.verifyUSER('a000007@fmr.com', 'ItsASecet101')).toBe(false);
    })
  ));
});
