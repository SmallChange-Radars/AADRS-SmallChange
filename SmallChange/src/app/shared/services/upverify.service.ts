import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Login } from '../models/login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class UpverifyService {
  url: string = "http://localhost:8080/api/auth/signin";

  verifyCredentials(user: Login): Observable<Token> {
    
    return this.httpClient.post<Token>(this.url,user).pipe(catchError(this.handleError));
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
