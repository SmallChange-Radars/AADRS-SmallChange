import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  url: string = 'http://localhost:3000/stocksList';
  portfolioUrl: string = 'http://localhost:3000/portfolio';
  activityUrl: string = 'http://localhost:3000/tradeActivity';

  constructor(private http: HttpClient, private user: UserService) { }

  getStock(query: string): Observable<Stock[]> {
    let url = this.url + '?Symbol=' + query;
    return this.http.get<Stock[]>(url);
  }

  getPortfolio(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.portfolioUrl + "/" + this.user.getUser());
  }

  setPortfolio(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<Stock>(this.portfolioUrl, stock, { headers: headers });
  }

  setActivity(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<Stock>(this.url, stock, { headers: headers });
  }
}
