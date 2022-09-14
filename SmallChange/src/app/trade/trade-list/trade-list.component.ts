import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { catchError, Observable, throwError } from 'rxjs';

import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';

const sectors: string[] = [
  "All",
  "Communication Services",
  "Consumer Discretionary",
  "Consumer Staples",
  "Energy",
  "Financials",
  "Health Care",
  "Industrials",
  "Information Technology",
  "Materials",
  "Real Estate",
  "Utilities"];

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
})
export class TradeListComponent implements OnInit {
  stocks: Trade[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 200;

  searchText: string = "";

  constructor(private service: TradeService) { }

  getStocks() {
    this.service.getStocks(this.page, this.pageSize, this.searchText).subscribe((response) => {
      this.stocks = response?.body!;
      this.collectionSize = +response.headers.get('X-Total-Count')!;
    });
  }

  // getSearchStocks(searchText: any) {
  //   this.service
  //     .getSearchStocksSymbol(searchText)
  //     .subscribe((data) => (this.stocks = data));
  //   this.service
  //     .getSearchStocksName(searchText)
  //     .subscribe((data) => (this.stocks = this.stocks.concat(data)));
  // }

  onChange(value: string) {
    this.getStocks();
  }

  ngOnInit(): void {
    this.getStocks();
  }
}
