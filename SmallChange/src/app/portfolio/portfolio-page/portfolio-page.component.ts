import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { ClientPortfolio } from '../../shared/models/client-portfolio';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {

  page = 1;
  pageSize = 10;
  collectionSize = 200;

  searchText: string = '';

  cp: ClientPortfolio[] = [];
  totalPortfolio: ClientPortfolio = { name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0 };
  // sum: number = -1;

  public values = this.cp.map(item => item.value)
  public names = this.cp.map(item => item.name)
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  public token = '';

  constructor(private portfolioService: PortfolioService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getPortfolio();
    this.getTotalPortfolio();
    // this.getPortfolioTable();
    const values = this.cp.map(item => item.value)
    const names = this.cp.map(item => item.name)
    // console.log(values)
    this.doughnutChartLabels = names;
    this.doughnutChartDatasets = [
      { data: values, label: 'Asset Allocation' }
    ];
    // console.log(this.doughnutChartDatasets);
    // console.log(this.doughnutChartLabels)

    this.token = this.cookieService.get("accessToken");
    console.log("This is in portfolio",this.token);
  }

  getPortfolio() {
    this.portfolioService.getPortfolio().subscribe(data => this.cp = data);
  }

  getTotalPortfolio() {
    this.portfolioService.getTotalPortfolio().subscribe(data => this.totalPortfolio = data);
  }

  // getSortedStocks() {
  //   this.portfolioService
  //     .getSortedStocks(this.page, this.pageSize, this.searchText, "", "")
  //     .subscribe((response) => {
  //       this.cp = response?.body!;
  //       this.collectionSize = +response.headers.get('X-Total-Count')!;
  //     });
  // }

  // getPortfolioTable() {
  //   this.portfolioService
  //     .getPortfolioTable(1, 2, '', 'asc', '')
  //     .subscribe(data => this.cp = data);
  //   console.log(this.cp);
  // }







}
