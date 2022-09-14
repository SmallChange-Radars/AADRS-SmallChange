import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';

import { TradeListComponent } from './trade-list.component';

describe('TradeListComponent', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;
  let getStocksSpy: any;

  beforeEach(async () => {
    const testStocks: Trade[] = [
      {
        Symbol: 'Symbol1',
        Name: 'Name1',
        Sector: 'Sector1',
        Price: [-1],
        Market_Cap: 24888,
      },
      {
        Symbol: 'Symbol2',
        Name: 'Name2',
        Sector: 'Sector2',
        Price: [-1],
        Market_Cap: 36789,
      },
    ];
    let tradeService: any = jasmine.createSpyObj('TradeService', ['getStocks']);
    getStocksSpy = tradeService.getStocks.and.returnValue(of(testStocks));
    await TestBed.configureTestingModule({
      declarations: [TradeListComponent],
      providers: [{ provide: TradeService, useValue: tradeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve stocks from the service', () => {
    expect(component.stocks.length).toBeGreaterThan(0);
  });

  it('should display a table with more than one field', () => {
    expect(getStocksSpy).toHaveBeenCalled();
  });
});
