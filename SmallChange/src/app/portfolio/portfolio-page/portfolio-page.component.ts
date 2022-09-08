import { Component, Input, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { ClientPortfolio } from '../../shared/models/client-portfolio';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {

  // cp: ClientPortfolio[] = [
  //   {name: 'AAPL', price: 158.91, value: 85493.58}, 
  //   {name: 'AMZN', price: 128.73, value: 59859.45},
  //   {name: 'SBUX', price: 83.41, value: 82075.44},
  //   {name: 'PG', price: 140.18, value: 91817.90},
  //   {name: 'TRMR', price: 7.91, value: 117985.56},
  // ]

  cp: ClientPortfolio[] = [];

  // @Input() cp: ClientPortfolio[] = [];
  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio() {
    this.portfolioService.getPortfolio().subscribe(data => this.cp = data);
  }

}
