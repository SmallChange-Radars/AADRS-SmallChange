import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  url: string = 'http://localhost:3000/stocksList';

  constructor(private http: HttpClient) { }
  
  getStock(query: string): Observable<Stock[]> {
    let url = this.url + '?Symbol=' + query;
    return this.http.get<Stock[]>(url);
  }

  beforeSell(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url);
  }
}
