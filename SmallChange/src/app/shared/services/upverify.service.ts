import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class UpverifyService {
  url: string = "http://localhost:3000/userAuth";
  detailsUrl: string="http://localhost:3000/userDetails?email=";

  verifyCredentials(username: string, password: string): Observable<Login> {
    return this.httpClient.get<Login>(this.url + "/" + username).pipe(catchError(this.handleError));
  }

  getDetails(username: string): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.detailsUrl + username).pipe(catchError(this.handleError));
  }


  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error Code: ${error.status}\n` +
        `Body: ${error.error}`);
    }
    return throwError(() =>"Invalid Credentials");
  }
}
