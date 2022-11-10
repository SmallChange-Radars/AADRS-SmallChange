import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Instrument } from '../models/instrument';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  url: string = 'http://localhost:8080/api/instruments-prices';
  constructor(private http: HttpClient, private user: UserService, private router:Router) { }

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
    return this.http.get<Instrument[]>(url, { headers: headers, observe: "response" }).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
    }
    return throwError(() => 'Unable to contact smallchange service; Please try again later');
  }

}
