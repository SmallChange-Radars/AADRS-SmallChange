import { Component, Input, OnInit } from '@angular/core';
import { ClientPortfolio } from '../../shared/models/client-portfolio';

let sum1=0;

@Component({
  selector: 'app-portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})

export class PortfolioTableComponent implements OnInit {
  sum1: any =0;
  @Input() cp: ClientPortfolio[] = [];  
  
  sum = this.cp.reduce<number>((accumulator, obj) => {
    return accumulator + obj.value;
  }, 0);
  
  // present on top
  // profit and loss
  // pagination
  // price value - right aligned
  // sum1: number=0;
  // sum1 = this.cp.forEach((obj) => {
  //   sum1+=obj.value;
  // })
  
  constructor() { }

  ngOnInit(): void {
    this.sum1 = this.cp.forEach((obj) => {
      sum1+=obj.value;
    })
    console.log(sum1);
  } 
  

}
