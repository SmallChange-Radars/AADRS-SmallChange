import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  url: string = 'http://localhost:3000/stocksList';
  portfolioUrl: string = 'http://localhost:3000/portfolio';
  activityUrl: string = 'http://localhost:3000/tradeActivity';

  constructor(private http: HttpClient, private user: UserService) {}

  getStock(query: string): Observable<Stock[]> {
    let url = this.url + '?Symbol=' + query;
    return this.http.get<Stock[]>(url);
  }

  getPortfolio(userId: string): Observable<any> {
    return this.http.get<any>(this.portfolioUrl + '/' + userId);
  }

  setPortfolio(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<Stock>(this.portfolioUrl, stock, {
      headers: headers,
    });
  }

  setActivity(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<Stock>(this.url, stock, { headers: headers });
  }

  getPortfolioActual(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/portfolio', {
      headers: headers,
    });
  }

  getWalletAmount(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/client/wallet', {
      headers: headers,
    });
  }
}
