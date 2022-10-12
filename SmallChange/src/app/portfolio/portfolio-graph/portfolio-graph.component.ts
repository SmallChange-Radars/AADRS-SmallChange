import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';

@Component({
  selector: 'app-portfolio-graph',
  templateUrl: './portfolio-graph.component.html',
  styleUrls: ['./portfolio-graph.component.scss']
})
export class PortfolioGraphComponent implements OnInit {

  @Input() cp: ClientPortfolio[] = [];
  public values = this.cp.map(item => item.value)
  public names = this.cp.map(item => item.name)
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor() { }

  ngOnInit(): void {
    const values = this.cp.map(item => item.value)
    const names = this.cp.map(item => item.name)
    // console.log(values)
    this.doughnutChartLabels = names;
    this.doughnutChartDatasets = [
      { data: values, label: 'Asset Allocation' }
    ];
  }

}
