import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instrument } from '../models/instrument';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  url: string = 'http://localhost:8080/api/instruments-prices';
  constructor(private http: HttpClient, private user: UserService) { }

  getSortedStocks(pageNo: number, pageSize: number, query: string, sortDirection: string, sortColumn: string, categoryId: string): Observable<HttpResponse<Instrument[]>> {
    let url = this.url + '?q=' + query + '&_page=' + pageNo + '&_limit=' + pageSize;

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.getUser()
    );

    if (!(categoryId === '')) {
      url += '&categoryId=' + categoryId;
    }
    if (!(sortDirection === '' || sortColumn === '')) {
      url += "&_sort=" + sortColumn + "&_order=" + sortDirection;
    }
    return this.http.get<Instrument[]>(url, { headers: headers, observe: "response" });
  }



  // getStocks(pageNo: number, pageSize: number, query: string): Observable<HttpResponse<Trade[]>> {
  //   let url = this.url + '?q=' + query + '&_page=' + pageNo + '&_limit=' + pageSize;
  //   return this.http.get<Trade[]>(url, { observe: "response" });
  // }

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
