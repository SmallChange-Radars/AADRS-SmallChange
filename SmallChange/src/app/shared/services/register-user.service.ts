import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client';
import { UpverifyService } from './upverify.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  user: any;
  private url: string = "http://localhost:8080/api/auth/signup";

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Client> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.getUser()
    );
    return this.http.get<Client>("http://localhost:8080/client/clientInfo",{
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  pushUser(user: Client): Observable<any> {
    return this.http.post(this.url, user).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log("In error: ",error.error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Error Code: ${error.status}\n` +
        `Body: ${error.error}`);
    }
    if(error.error.message == "Error: Email is already in use!")
      return throwError(() =>"Error: Email is already in use!");
    else
      return throwError(() =>"Invalid Credentials");
  }
}
