import { Component, Input, OnInit } from '@angular/core';
import { ClientPortfolio } from 'src/app/shared/models/client-portfolio';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  // @Input() sum: any;
  @Input() totalPortfolio: any; 
  // ClientPortfolio = {name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0};

  constructor() { }

  ngOnInit(): void {
    
  }

}
