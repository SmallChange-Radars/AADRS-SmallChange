import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientPortfolio } from './shared/models/client-portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  cp: ClientPortfolio[] = [
    {name: 'AAPL', qty: 538, price: 158.91, value: 85493.58}, 
    {name: 'AMZN', qty: 465, price: 128.73, value: 59859.45},
    {name: 'SBUX', qty: 984, price: 83.41, value: 82075.44},
    {name: 'PG', qty: 655, price: 140.18, value: 91817.90},
    {name: 'TRMR', qty: 14916, price: 7.91, value: 117985.56},
  ];

  getPortfolio(): Observable<ClientPortfolio[]> {
    return of(this.cp);
  }
}
