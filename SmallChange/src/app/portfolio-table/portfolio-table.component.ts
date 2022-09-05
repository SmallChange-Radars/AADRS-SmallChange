import { Component, Input, OnInit } from '@angular/core';
import { ClientPortfolio } from '../shared/models/client-portfolio';

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})
export class PortfolioTableComponent implements OnInit {

  @Input() cp: ClientPortfolio[] = [];  
  constructor() { }

  ngOnInit(): void {
  }

}
