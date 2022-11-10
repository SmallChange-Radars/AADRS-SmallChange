import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { UserService } from 'src/app/shared/services/user.service';

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
      position: 'right',
      
      labels: {
        filter: (legendItem, chartData) => {
          let local=this.cp.slice();
          local.sort((a,b)=>b.quantity-a.quantity);
          const names=local.map(item => item.instrumentId).slice(0,20);
          return names.includes(legendItem.text);
        }
      }
 }
    }
  };

  constructor(private service: PortfolioService, private user: UserService) { }

  ngOnInit(): void {
    this.service.getPortfolio().subscribe({
      next: data => {
        this.cp = data?.body!;
        const values = this.cp.map(item => item.value)
        const names = this.cp.map(item => item.instrumentId)
        this.doughnutChartLabels = names;
        this.doughnutChartDatasets = [
          { data: values, label: 'Asset Allocation' }
        ];

      },
      error: (e) => {
        console.log(e);
        this.user.removeUser();
      }
    });
  }

}
