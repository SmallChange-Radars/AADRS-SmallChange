import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { catchError, Observable, throwError } from 'rxjs';

import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
})
export class TradeListComponent implements OnInit {
  stocks: Trade[] = [];

  searchText: string = '';

  constructor(private service: TradeService) {}

  getStocks() {
    this.service.getStocks().subscribe((data) => (this.stocks = data));
  }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  getSearchStocks(searchText: any) {
    this.service
      .getSearchStocksSymbol(searchText)
      .subscribe((data) => (this.stocks = data));
    this.service
      .getSearchStocksName(searchText)
      .subscribe((data) => (this.stocks = this.stocks.concat(data)));
  }

  onChange(value: string) {
    if (value) this.getSearchStocks(value);
    else this.getStocks();
  }

  ngOnInit(): void {
    this.getStocks();
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured - ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was - ${error.error}`
      );
    }

    return throwError(
      () => 'Unable to contact service, please try again later.'
    );
  }
}
