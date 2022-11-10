import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';

import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    const testcp: ClientPortfolio[] = [
      { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
      { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
      { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
      { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
      { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
    ];
    const client: Client = {
      clientId: '',
      email: '',
      dateOfBirth: '',
      country: '',
      postalCode: '',
      identification: [],
      password: '',
      token: '',
      wallet: 999999.99,
      walletCurrency: '',
      role: ''
    };

    let portfolioService: any = jasmine.createSpyObj('PortfolioService', [
      'getPortfolio',
    ]);

    let modalServiceService: any = jasmine.createSpyObj('ModalServiceService', [
      'getWalletAmount',
    ]);
    const headers = new HttpHeaders()
      .set('totalValue', '987654.32')
      .set('totalGains', '1234.56');
    portfolioService.getPortfolio.and.callFake(
      () => {
        return of(new HttpResponse({ status: 200, body: testcp, headers: headers }));
      });

    modalServiceService.getWalletAmount.and.callFake(
      () => {
        return of(client);
      });


    await TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      providers: [
        { provide: PortfolioService, useValue: portfolioService },
        { provide: ModalServiceService, useValue: modalServiceService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toContain("Summary");
  });

  it('should get the right wallet amount from modalService', () => {
    expect(component.walletAmount).toEqual(999999.99);
  });

  it('should get the right summary value from portfolioService', () => {
    expect(component.summaryValue).toEqual(987654.32);
  });

  it('should get the right summary gains from portfolioService', () => {
    expect(component.summaryGains).toEqual(1234.56);
  });

});
