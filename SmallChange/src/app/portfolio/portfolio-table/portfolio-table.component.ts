import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { ClientPortfolio } from '../../shared/models/client-portfolio';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})

export class PortfolioTableComponent implements OnInit {
  sum: any = 0;
  cp: ClientPortfolio[] = [];
  @Input() c: ClientPortfolio[] = [];


  page = 1;
  pageSize = 3;
  collectionSize = 200;

  searchText: string = '';

  getPortfolio() {
    this.service.getPortfolio().subscribe(data => {
      this.cp = data?.body!;

      // console.log(this.cp)
    });
  }

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service
      .getSortedStocks(this.page, this.pageSize, this.searchText, direction, column)
      .subscribe((response) => {
        this.cp = response?.body!;
        this.collectionSize = +response.headers.get('X-Total-Count')!;
      });
  }

  changePagesize(size: number) {
    this.pageSize = size;
    this.onChange("");
  }

  onChange(value: string) {
    this.getSortedStocks();
  }

  getSortedStocks() {
    this.service
      .getSortedStocks(this.page, this.pageSize, this.searchText, "", "")
      .subscribe((response) => {
        this.cp = response?.body!;
        this.collectionSize = +response.headers.get('X-Total-Count')!;
        console.log("hi");
      });
  }

  constructor(private service: PortfolioService) { }


  ngOnInit(): void {
    this.getPortfolio();
    // this.getSortedStocks();
  }


}
