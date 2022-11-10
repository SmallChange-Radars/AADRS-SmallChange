import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';

import { RegisterUserService } from './register-user.service';

describe('RegisterUserService', () => {
  let service: RegisterUserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule]});
    service = TestBed.inject(RegisterUserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post user',inject([RegisterUserService],
    fakeAsync((service:RegisterUserService)=>{
      const mockClient: Client= new Client("","testing123@gmail.com","","US","12345",[new ClientIdentification("","")],"spec","",20,"USD","ROLE_CLIENT");

      const url:string ='http://localhost:8080/api/auth/signup';
      let client:Client;
      let response = {
        "message": "User registered successfully!"
      };
      service.pushUser(mockClient).subscribe();
      let req = httpTestingController.expectOne(url);
      req.flush(response);
      httpTestingController.verify();
      tick();
      expect(req.request.method).toBe('POST');
    })));

    
});
