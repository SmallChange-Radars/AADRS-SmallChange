import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';

import { PortfolioGraphComponent } from './portfolio-graph.component';

describe('PortfolioGraphComponent', () => {
  let component: PortfolioGraphComponent;
  let fixture: ComponentFixture<PortfolioGraphComponent>;

  beforeEach(async () => {
    const testcp: ClientPortfolio[] = [
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
    let portfolioService: any = jasmine.createSpyObj('PortfolioService', [
      'getPortfolio',
    ]);

    portfolioService.getPortfolio.and.callFake(() => {
      return of(new HttpResponse({ status: 200, body: testcp }));
    });

    await TestBed.configureTestingModule({
      declarations: [PortfolioGraphComponent],
      providers: [{ provide: PortfolioService, useValue: portfolioService }],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toContain(
      'Allocation'
    );
  });

  it('should receive portfolio details from portfolio service', () => {
    expect(component.cp.length).toBe(5);
    expect(component.cp[0].instrumentId).toContain('AAPL');
    expect(component.cp[1].instrumentId).toContain('AMZN');
  });
});
