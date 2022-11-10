import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';
import { Login } from '../models/login';
import { Token } from '../models/token';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TokenService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post user',inject([TokenService],
    fakeAsync((service:TokenService)=>{
      const mockClient: Login= new Login("a000007@gmail.com","itsasecret101");

      const url:string ='http://localhost:8080/api/auth/signin';
      let token:Token= new Token("",[""],"","");
      let response: Token = {
        "email": "a000007@gmail.com",
        "roles": [
          "ROLE_ADMIN"
        ],
        "tokenType": "Bearer",
        "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMDAwMDA3QGdtYWlsLmNvbSIsImlhdCI6MTY2ODAwMzkxOCwiZXhwIjoxNjY4MDkwMzE4fQ.8lHVrLr6zwe9_AZ9dqWVKDEDb_tfNTV4fsFcCsxvC4kOUMoYlykZLj-o0rDx8rkhWnKAVMfxRP0KnFkAihNYTQ"
      };
      service.postUserLogin(mockClient).subscribe((data)=> token = data);
      let req = httpTestingController.expectOne(url);
      req.flush(response);
      httpTestingController.verify();
      tick();
      expect(req.request.method).toBe('POST');
      expect(token.tokenType).toBe(response.tokenType);
      expect(token.email).toBe(response.email);
    })));
});
