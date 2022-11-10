import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { UserService } from 'src/app/shared/services/user.service';
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
    this.service.getPortfolio().subscribe({
      next: data => {
        this.cp = data?.body!;

        // console.log(this.cp)
      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
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
      .subscribe({
        next: (response) => {
          this.cp = response?.body!;
          this.collectionSize = +response.headers.get('X-Total-Count')!;
        },
        error: (e) => {
          console.log(e);
          this.user.removeUser();
        }
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
      .subscribe({
        next: (response) => {
          this.cp = response?.body!;
          this.collectionSize = +response.headers.get('X-Total-Count')!;
          console.log("hi");
        },
        error: (e) => {
          console.log(e);
          this.user.removeUser();
        }
      });
  }

  constructor(private service: PortfolioService, private user: UserService) { }


  ngOnInit(): void {
    this.getPortfolio();
    // this.getSortedStocks();
  }


}
