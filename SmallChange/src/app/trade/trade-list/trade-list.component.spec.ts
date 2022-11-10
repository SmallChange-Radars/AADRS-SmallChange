import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Instrument } from 'src/app/shared/models/instrument';
import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';

import { TradeListComponent } from './trade-list.component';

describe('TradeListComponent', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;
  let getStocksSpy: any;
  let getSortedStocksSpy: any;

  beforeEach(async () => {
    const testStocks: Instrument[] = [
      {
        instrumentId: 'Symbol1',
        instrumentDescription: 'Name1',
        categoryId: 'Sector1',
        askPrice: -1,
        bidPrice: -1,
        minQuantity: 500,
        maxQuantity: 1000,
      },
      {
        instrumentId: 'Symbol2',
        instrumentDescription: 'Name2',
        categoryId: 'Sector2',
        askPrice: -1,
        bidPrice: -1,
        minQuantity: 500,
        maxQuantity: 1000,
      },
    ];
    let tradeService: any = jasmine.createSpyObj('TradeService', [
      'getStocks',
      'getSortedStocks',
    ]);
    getStocksSpy = tradeService.getStocks.and.returnValue(of(testStocks));
    getSortedStocksSpy = tradeService.getSortedStocks.and.returnValue(
      of({
        body: testStocks,
      })
    );
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
    expect(getSortedStocksSpy).toHaveBeenCalled();
  });

  it('should display a table with more than one field', () => {
    expect(component.stocks.length).toBeGreaterThan(0);
  });
});
