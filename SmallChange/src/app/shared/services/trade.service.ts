import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Trade } from '../models/trade';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  url: string = 'http://localhost:3000/stocks';
  constructor(private http: HttpClient) { }

  getStocks(pageNo: number, pageSize: number, query: string): Observable<HttpResponse<Trade[]>> {
    let url = this.url + '?q=' + query + '&_page=' + pageNo + '&_limit=' + pageSize;
    return this.http.get<Trade[]>(url, { observe: "response" });
  }

  // getStocks(pageNo: number, pageSize: number): Observable<HttpResponse<Trade[]>> {
  //   let url = this.url + '?_page=' + pageNo + '&_limit=' + pageSize;
  //   return this.http.get<Trade[]>(url, {observe: "response"});
  // }

  // getSearchStocksSymbol(searchText: string) {
  //   let url = this.url + '?Symbol_like=.*' + searchText + '.*';
  //   return this.http.get<Trade[]>(url);
  // }

  // getSearchStocksName(searchText: string) {
  //   let url = this.url + '?Name_like=.*' + searchText + '.*';
  //   return this.http.get<Trade[]>(url);
  // }
}
