import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Login } from '../models/login';

import { UpverifyService } from './upverify.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('UpverifyService', () => {

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: UpverifyService = TestBed.inject(UpverifyService);
    expect(service).toBeTruthy();
  });

  it('should return an object with correct credntials', inject(
    [UpverifyService],
    fakeAsync((service: UpverifyService) => {
      let login: Login = new Login("Something", "Nothing");
      let loginReturn: Login = new Login('', '');
      let errorMessage: string[] = [];
      service.verifyCredentials(login.id, login.password).subscribe({
        next: (data) => {
          loginReturn = data;
          if (loginReturn.password.length !== login.password.length) {
            errorMessage = ["Incorrect Password"];
          }
        },
        error: (e) => { errorMessage = [e]; }
      });
      const req = httpTestingController.expectOne(
        'http://localhost:3000/userAuth/Something');
      expect(req.request.method).toEqual("GET");
      req.flush(login);
      httpTestingController.verify();
      tick();
      expect(loginReturn).toBeTruthy();
      expect(loginReturn.id).toBe(login.id);
      expect(loginReturn.password).toBe(login.password);
    })
  ));

  it('should handle 404', inject([UpverifyService], fakeAsync((service: UpverifyService) => {
    let errorResp: HttpErrorResponse;
    let errorReply: string = '';
    const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
    let login: Login = new Login("Something", "Nothing");
    service.verifyCredentials(login.id, login.password).subscribe({
      next: () => fail('Should not succeed'),
      error: (e) => errorReply = e
    });
    const req = httpTestingController.expectOne('http://localhost:3000/userAuth/Something');
    expect(req.request.method).toEqual('GET');
    req.flush('Forced 404', {
      status: 404,
      statusText: 'Not Found'
    });
    httpTestingController.verify();
    tick();
    expect(errorReply).toBe('Incorrect Username');
    expect(errorHandlerSpy).toHaveBeenCalled();
    errorResp = errorHandlerSpy.calls.argsFor(0)[0];
    expect(errorResp.status).toBe(404);
  })));
  it('should handle Network error', inject([UpverifyService], fakeAsync((service: UpverifyService) => {
    let errorResp: HttpErrorResponse;
    let errorReply: string = '';
    const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
    let login: Login = new Login("Something", "Nothing");
    service.verifyCredentials(login.id, login.password).subscribe({
      next: () => fail('Should not succeed'),
      error: (e) => errorReply = e
    });
    const req = httpTestingController.expectOne('http://localhost:3000/userAuth/Something');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    const mockError = new ProgressEvent('Simulated Network Error');
    req.error(mockError);
    httpTestingController.verify();
    tick();
    expect(errorReply).toBe('Incorrect Username');
    expect(errorHandlerSpy).toHaveBeenCalled();
    errorResp = errorHandlerSpy.calls.argsFor(0)[0];
    expect(errorResp.error.type).toBe('Simulated Network Error');

  })));
});
