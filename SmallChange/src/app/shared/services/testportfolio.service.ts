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
    { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
    { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
    { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
    { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
    { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
    { instrumentId: 'GM', quantity: 2635, currentPrice: 39.13, value: 103107.55, gains: 3399.15, returns: 3.41 },
    { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
    { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
    { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
    { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
    { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
    { instrumentId: 'GM', quantity: 2635, currentPrice: 39.13, value: 103107.55, gains: 3399.15, returns: 3.41 }
  ];

  // tb: Cl

  getPortfolio(): Observable<ClientPortfolio[]> {
    return of(this.cp);
  }

  getTotalPortfolio(): Observable<ClientPortfolio> {
    let pf: ClientPortfolio = {instrumentId: '', quantity: 0, currentPrice: 0, value: 0, gains: 0, returns: 0};
    this.cp.forEach((obj) => {
      pf.quantity += obj.quantity;
      pf.currentPrice += obj.currentPrice;
      pf.value += obj.value;
      pf.gains += obj.gains;
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

        x_tb = {instrumentId: obj.Stock, quantity: x_qty, value: x_value, currentPrice: obj.Prices[0], gains: 0, returns: 1};
        tb.push(x_tb);
    },
    // console.log(tb)
    )} );
    
    return of(tb);
  }


}
