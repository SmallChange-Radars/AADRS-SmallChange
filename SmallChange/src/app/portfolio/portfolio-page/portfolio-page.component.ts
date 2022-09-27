import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { ClientPortfolio } from '../../shared/models/client-portfolio';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {

  cp: ClientPortfolio[] = [];
  totalPortfolio: ClientPortfolio = {name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0};
  // sum: number = -1;

  public values = this.cp.map(item => item.value)
  public names = this.cp.map(item => item.name)
  public doughnutChartLabels: string[] =[];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =[];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getPortfolio();
    this.getTotalPortfolio();
    this.getPortfolioTable();
    const values = this.cp.map(item => item.value)
    const names = this.cp.map(item => item.name)
    // console.log(values)
    this.doughnutChartLabels = names;
    this.doughnutChartDatasets= [
      { data: values, label: 'Asset Allocation'}
    ];
    console.log(this.doughnutChartDatasets);
    console.log(this.doughnutChartLabels)
  
  }

  getPortfolio() {
    this.portfolioService.getPortfolio().subscribe(data => this.cp = data);
  }

  getTotalPortfolio() {
    this.portfolioService.getTotalPortfolio().subscribe(data => this.totalPortfolio = data);
  }

  getPortfolioTable() {
    this.portfolioService.getPortfolioTable().subscribe(data => this.cp = data);
  }

  

  


}
