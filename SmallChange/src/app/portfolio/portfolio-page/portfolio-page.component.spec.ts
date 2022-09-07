import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';

import { PortfolioPageComponent } from './portfolio-page.component';
import { PortfolioService } from '../../portfolio.service';
import { By } from '@angular/platform-browser';

describe('PortfolioPageComponent', () => {
  let component: PortfolioPageComponent;
  let fixture: ComponentFixture<PortfolioPageComponent>;

  beforeEach(async () => {
    const testcp: ClientPortfolio[] = [
      {name: 'AAPL', qty: 538, price: 158.91, value: 85493.58}, 
      {name: 'AMZN', qty: 465, price: 128.73, value: 59859.45},
      {name: 'SBUX', qty: 984, price: 83.41, value: 82075.44},
      {name: 'PG', qty: 655, price: 140.18, value: 91817.90},
      {name: 'TRMR', qty: 14916, price: 7.91, value: 117985.56},
    ];
    let portfolioService: any = jasmine.createSpyObj('PortfolioService',['getPortfolio']);
    portfolioService.getPortfolio.and.returnValue(of(testcp));
    await TestBed.configureTestingModule({
      declarations: [ PortfolioPageComponent ],
      providers: [{provide: PortfolioService, useValue: portfolioService}]
    })
    .compileComponents();
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
    expect(component.cp[0].name).toContain('AAPL');
    expect(component.cp[1].name).toContain('AMZN');
  });

  it('should pass portfolio details to portfolio-table component', () => {
    const ptable = fixture.debugElement.query(By.css('app-portfolio-table')).componentInstance;
    expect(ptable.cp.length).toBe(5);
  })
});
