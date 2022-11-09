import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { UserService } from 'src/app/shared/services/user.service';
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
  totalPortfolio: ClientPortfolio = { instrumentId: '', quantity: 0, currentPrice: 0, value: 0, gains: 0, returns: 0 };

  summary: number = 0;
  summaryGains: number = 0;
  // public values = this.cp.map(item => item.value)
  // public names = this.cp.map(item => item.instrumentId)
  // public doughnutChartLabels: string[] = [];
  // public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  // public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  //   responsive: false
  // };

  public token = '';

  constructor(private userService: UserService,private portfolioService: PortfolioService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getPortfolio();
    this.getTotalPortfolio();
    // this.getPortfolioSummary();

    // this.getPortfolioTable();
    // const values = this.cp.map(item => item.value)
    // const names = this.cp.map(item => item.instrumentId)
    // // console.log(values)
    // this.doughnutChartLabels = names;
    // this.doughnutChartDatasets = [
    //   { data: values, label: 'Asset Allocation' }
    // ];
    // console.log(this.doughnutChartDatasets);
    // console.log(this.doughnutChartLabels)
//Bearer token
    this.token = this.cookieService.get("accessToken");
    this.userService.addUser(this.token);
    console.log("This is in portfolio",this.token);
  }

  getPortfolio() {
    this.portfolioService.getPortfolio().subscribe(data => {
      this.cp = data?.body!;
      this.summary = +data.headers.get("totalValue")!;
      this.summaryGains = +data.headers.get("totalGains")!;
    });
  }

  getPortfolioSummary() {
    this.portfolioService.getPortfolioSummary().subscribe(data => {
      this.summary = data[0];
      this.summaryGains = data[1];
      console.log(this.summaryGains)
    });
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
