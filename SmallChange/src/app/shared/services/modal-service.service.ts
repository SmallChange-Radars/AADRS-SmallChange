import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../models/order';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  url: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private user: UserService) { }

  executeTrade(order: Order): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.post<Order>(this.url + '/tradeExecution', order, {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  getPortfolio(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.get(this.url + '/portfolio', {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  getWalletAmount(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.get(this.url+'/client/wallet', {
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error Code: ${error.status}\n` +
        `Body: ${error.error}`);
    }
    return throwError(() => "Error Querying Database");
  }
}
