import { Component, Input, OnInit } from '@angular/core';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  // @Input() sum: any;
  @Input() totalPortfolio: any; 
  // ClientPortfolio = {name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0};
  summary: number = 0;
  summaryGains: number = 0;
  constructor(private service: PortfolioService) { }

  ngOnInit(): void {
    this.getPortfolioSummary();
  }

  getPortfolioSummary() {
    this.service.getPortfolioSummary().subscribe(data => {
      this.summary = data[0];
      this.summaryGains = data[1];
      console.log(this.summaryGains)
    });
  }

}
