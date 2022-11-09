import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';

import { PortfolioPageComponent } from './portfolio-page.component';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { By } from '@angular/platform-browser';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;

  beforeEach(async () => {
    const testcp: ClientPortfolio[] = [
      { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
      { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
      { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
      { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
      { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
    ];
    let portfolioService: any = jasmine.createSpyObj('PortfolioService', [
      'getPortfolio',
    ]);
    portfolioService.getPortfolio.and.returnValue(of(testcp));
    await TestBed.configureTestingModule({
      declarations: [PortfolioPageComponent],
      providers: [{ provide: PortfolioService, useValue: portfolioService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive portfolio details from portfolio service', () => {
    expect(component.cp.length).toBe(5);
    expect(component.cp[0].instrumentId).toContain('AAPL');
    expect(component.cp[1].instrumentId).toContain('AMZN');
  });

  it('should pass portfolio details to portfolio-table component', () => {
    const ptable = fixture.debugElement.query(
      By.css('app-portfolio-table')
    ).componentInstance;
    expect(ptable.cp.length).toBe(5);
  });
});
