import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ClientPortfolio } from '../models/client-portfolio';
import { Portfolio } from '../models/portfolio';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {

  public url: string = 'http://localhost:8080/api/portfolio';

  port: Portfolio[] = [];

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  // cp: ClientPortfolio[] = [
  //   { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
  //   { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
  //   { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
  //   { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
  //   { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
  //   { instrumentId: 'GM', quantity: 2635, currentPrice: 39.13, value: 103107.55, gains: 3399.15, returns: 3.41 },
  //   { instrumentId: 'AAPL', quantity: 538, currentPrice: 158.91, value: 85493.58, gains: -7459.37, returns: -8.02 },
  //   { instrumentId: 'AMZN', quantity: 465, currentPrice: 128.73, value: 59859.45, gains: 6470.48, returns: 9.75 },
  //   { instrumentId: 'SBUX', quantity: 984, currentPrice: 83.41, value: 82075.44, gains: -4910.16, returns: -5.64 },
  //   { instrumentId: 'PG', quantity: 655, currentPrice: 140.18, value: 91817.9, gains: -5777.10, returns: -5.92 },
  //   { instrumentId: 'TRMR', quantity: 14916, currentPrice: 7.91, value: 117985.56, gains: -4027.32, returns: -3.30 },
  //   { instrumentId: 'GM', quantity: 2635, currentPrice: 39.13, value: 103107.55, gains: 3399.15, returns: 3.41 }
  // ];

  // create wallet function

  getPortfolio(): Observable<HttpResponse<ClientPortfolio[]>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUser());
    return this.http.get<ClientPortfolio[]>(this.url, {
      observe: "response",
      headers: headers
    }).pipe(catchError(this.handleError));;
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
    }
    return throwError(() => 'Unable to contact portfolio service; Please try again later');
  }

  /*
  getPortfolioSummary(): Observable<number[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getUser());
    return this.http.get<number[]>(this.url + '/summary', {
      headers: headers
    });
  }

  // getPortfolio(): Observable<ClientPortfolio[]> {
  //   return of(this.cp);
  // }

  getTotalPortfolio(): Observable<ClientPortfolio> {
    let pf: ClientPortfolio = { instrumentId: '', quantity: 0, currentPrice: 0, value: 0, gains: 0, returns: 0 };
    this.cp.forEach((obj) => {
      pf.quantity += obj.quantity;
      pf.currentPrice += obj.currentPrice;
      pf.value += obj.value;
      pf.gains += obj.gains;
    });
    return of(pf);
  }

  */

  getSortedStocks(pageNo: number, pageSize: number, query: string, sortDirection: string, sortColumn: string): Observable<HttpResponse<ClientPortfolio[]>> {
    // let url = this.url + '?q=' + query + '&_page=' + pageNo + '&_limit=' + pageSize;
    let url = 'http://localhost:3000/portfolio-table' + '?&_page=' + pageNo + '&_limit=' + pageSize;
    if (sortDirection === '' || sortColumn === '') {
      return this.http.get<ClientPortfolio[]>(url, { observe: "response" });
    } else {
      url += "&_sort=" + sortColumn + "&_order=" + sortDirection;
      return this.http.get<ClientPortfolio[]>(url, { observe: "response" });
    }

  }

}
