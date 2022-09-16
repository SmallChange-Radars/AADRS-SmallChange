import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { catchError, Observable, throwError } from 'rxjs';
import { BuySellModalComponent } from 'src/app/shared/components/buy-sell-modal/buy-sell-modal.component';

import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';

const sectors: string[] = [
  'All',
  'Communication Services',
  'Consumer Discretionary',
  'Consumer Staples',
  'Energy',
  'Financials',
  'Health Care',
  'Industrials',
  'Information Technology',
  'Materials',
  'Real Estate',
  'Utilities',
];

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

  searchText: string = '';

  constructor(private service: TradeService, private modalService: NgbModal) {}

  getStocks() {
    this.service
      .getStocks(this.page, this.pageSize, this.searchText)
      .subscribe((response) => {
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

  changePagesize(size:number){
    this.pageSize=size;
    this.onChange("");
  }

  openModal(stock: Trade) {
    const modalRef = this.modalService.open(BuySellModalComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.modalTitle = 'Modal Title';
    modalRef.componentInstance.modalContent = stock;
    console.log(stock);
  }

  ngOnInit(): void {
    this.getStocks();
  }
}
