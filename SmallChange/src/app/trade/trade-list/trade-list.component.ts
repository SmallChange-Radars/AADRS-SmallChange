import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuySellModalComponent } from 'src/app/shared/components/buy-sell-modal/buy-sell-modal.component';
import { Instrument } from 'src/app/shared/models/instrument';

import { Trade } from 'src/app/shared/models/trade';
import { TradeService } from 'src/app/shared/services/trade.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';

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
  stocks: Instrument[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 200;

  searchText: string = '';
  direction = 'asc';
  column = 'instrumentDescription';
  category = '';

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.direction = direction;
    this.column = column;
    console.log(direction.length);

    //to display based on sort order
    if (direction == '') {
      this.direction = 'asc';
      this.column = 'instrumentDescription';
    }

    this.getSortedStocks();
  }

  constructor(private service: TradeService, private modalService: NgbModal) {}

  getSortedStocks() {
    this.service
      .getSortedStocks(
        this.page,
        this.pageSize,
        this.searchText,
        this.direction,
        this.column,
        this.category
      )
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
    this.getSortedStocks();
  }

  changePagesize(size: number) {
    this.pageSize = size;
    this.onChange('');
  }

  changeCategory(category: string) {
    this.category = category;
    this.onChange('');
  }

  openModal(stock: Instrument) {
    const modalRef = this.modalService.open(BuySellModalComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.modalTitle = 'Modal Title';
    modalRef.componentInstance.modalContent = stock;
    console.log(stock);
  }

  ngOnInit(): void {
    this.getSortedStocks();
  }
}
