import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClientPortfolio } from '../models/client-portfolio';

import { PortfolioService } from './portfolio.service';
import { UserService } from './user.service';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    let userService: any = jasmine.createSpyObj('UserService', ['getUser']);
    userService.getUser.and.callFake(() => {
      return '744385865';
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: userService }],
    });
    service = TestBed.inject(PortfolioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get widget list', inject(
    [PortfolioService],
    fakeAsync((service: PortfolioService) => {
      let cp: ClientPortfolio[] = [];
      let testcp: ClientPortfolio[] = [
        {
          instrumentId: 'AAPL',
          quantity: 538,
          currentPrice: 158.91,
          value: 85493.58,
          gains: -7459.37,
          returns: -8.02,
        },
        {
          instrumentId: 'AMZN',
          quantity: 465,
          currentPrice: 128.73,
          value: 59859.45,
          gains: 6470.48,
          returns: 9.75,
        },
        {
          instrumentId: 'SBUX',
          quantity: 984,
          currentPrice: 83.41,
          value: 82075.44,
          gains: -4910.16,
          returns: -5.64,
        },
        {
          instrumentId: 'PG',
          quantity: 655,
          currentPrice: 140.18,
          value: 91817.9,
          gains: -5777.1,
          returns: -5.92,
        },
        {
          instrumentId: 'TRMR',
          quantity: 14916,
          currentPrice: 7.91,
          value: 117985.56,
          gains: -4027.32,
          returns: -3.3,
        },
      ];

      service.getPortfolio().subscribe((data) => (cp = data?.body!));
      const req = httpTestingController.expectOne(
        'http://localhost:8080/api/portfolio'
      );

      expect(req.request.method).toBe('GET');

      req.flush(testcp);
      httpTestingController.verify();
      tick();

      expect(cp[0].instrumentId).toBe('AAPL');
    })
  ));

  it('should handle 404 error', inject(
    [PortfolioService],
    (service: PortfolioService) => {
      let errorResp: HttpErrorResponse;
      let errorReply: string = '';
      const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
      service.getPortfolio().subscribe({
        next: () => fail('Should not succeed'),
        error: (e) => (errorReply = e),
      });
      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toBe('GET');

      req.flush('Forced 404', {
        status: 404,
        statusText: 'Not Found',
      });

      httpTestingController.verify();
      expect(errorReply).toBe(
        'Unable to contact portfolio service; Please try again later'
      );
      expect(errorHandlerSpy).toHaveBeenCalled();

      errorResp = errorHandlerSpy.calls.argsFor(0)[0];
      expect(errorResp.status).toBe(404);
    }
  ));
});
