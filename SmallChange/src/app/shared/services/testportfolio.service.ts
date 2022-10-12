import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientPortfolio } from '../models/client-portfolio';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {

  public url: string = 'http://localhost:3000/portfolio/1234';

  port: Portfolio = {id: '', value: [
    {Stock: '', Prices: [], Quantities: []}
  ]}
  
  constructor(private http: HttpClient) {}

  cp: ClientPortfolio[] = [
    { name: 'AAPL', qty: 538, price: 158.91, value: 85493.58, prof: -7459.37, percent: -8.02 },
    { name: 'AMZN', qty: 465, price: 128.73, value: 59859.45, prof: 6470.48, percent: 9.75 },
    { name: 'SBUX', qty: 984, price: 83.41, value: 82075.44, prof: -4910.16, percent: -5.64 },
    { name: 'PG', qty: 655, price: 140.18, value: 91817.9, prof: -5777.10, percent: -5.92 },
    { name: 'TRMR', qty: 14916, price: 7.91, value: 117985.56, prof: -4027.32, percent: -3.30 },
    { name: 'GM', qty: 2635, price: 39.13, value: 103107.55, prof: 3399.15, percent: 3.41 },
    { name: 'AAPL', qty: 538, price: 158.91, value: 85493.58, prof: -7459.37, percent: -8.02 },
    { name: 'AMZN', qty: 465, price: 128.73, value: 59859.45, prof: 6470.48, percent: 9.75 },
    { name: 'SBUX', qty: 984, price: 83.41, value: 82075.44, prof: -4910.16, percent: -5.64 },
    { name: 'PG', qty: 655, price: 140.18, value: 91817.9, prof: -5777.10, percent: -5.92 },
    { name: 'TRMR', qty: 14916, price: 7.91, value: 117985.56, prof: -4027.32, percent: -3.30 },
    { name: 'GM', qty: 2635, price: 39.13, value: 103107.55, prof: 3399.15, percent: 3.41 }
  ];

  // tb: Cl

  getPortfolio(): Observable<ClientPortfolio[]> {
    return of(this.cp);
  }

  getTotalPortfolio(): Observable<ClientPortfolio> {
    let pf: ClientPortfolio = {name: '', qty: 0, price: 0, value: 0, prof: 0, percent: 0};
    this.cp.forEach((obj) => {
      pf.qty += obj.qty;
      pf.price += obj.price;
      pf.value += obj.value;
      pf.prof += obj.prof;
    });
    // console.log(pf);
    return of(pf);
  }

  getPortfolioCheck(): Observable<Portfolio> {

    return this.http.get<Portfolio>(this.url);       
  }

  getPortfolioTable(): Observable<ClientPortfolio[]> {
    var x_tb: ClientPortfolio;
    var tb: ClientPortfolio[] = [];
    let i=0;
    // : Portfolio[];
    this.getPortfolioCheck().subscribe(data => {
      this.port = data; 
      this.port.value.forEach((obj) => {
        i = obj.Prices.length;
        var x_value = 0;
        var x_qty = 0;
        for (var j=0; j<i; j++) {
          x_value += obj.Prices[j] * obj.Quantities[j];
          x_qty += obj.Quantities[j];
        }
        // console.log(x_value);

        x_tb = {name: obj.Stock, qty: x_qty, value: x_value, price: obj.Prices[0], prof: 0, percent: 1};
        tb.push(x_tb);
    },
    // console.log(tb)
    )} );
    
    return of(tb);
  }


}
