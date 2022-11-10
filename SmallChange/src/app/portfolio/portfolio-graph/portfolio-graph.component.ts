import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';

@Component({
  selector: 'app-portfolio-graph',
  templateUrl: './portfolio-graph.component.html',
  styleUrls: ['./portfolio-graph.component.scss']
})
export class PortfolioGraphComponent implements OnInit {

  cp: ClientPortfolio[] = [];
  public values = this.cp.map(item => item.value)
  public names = this.cp.map(item => item.instrumentId)
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
     },
     tooltip: {
        enabled: true
     }
    }
  };

  constructor(private service: PortfolioService) { }

  ngOnInit(): void {
    this.service.getPortfolio().subscribe(data => {
      this.cp = data?.body!;

      // console.log(this.cp)
    const values = this.cp.map(item => item.value)
    const names = this.cp.map(item => item.instrumentId)
    // console.log(values)
    this.doughnutChartLabels = names;
    this.doughnutChartDatasets = [
      { data: values, label: 'Asset Allocation' }
    ];
    
  });
  }

}
