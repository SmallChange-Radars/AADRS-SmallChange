import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UserActivity } from '../models/user-activity';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url="http://localhost:3000/tradeActivity/";
  
  constructor(private http: HttpClient,private user:UserService) { }

  getActivityHistory():Observable<UserActivity>{
    return this.http.get<UserActivity>(this.url+this.user.getUser()).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => 'Unable to contact service; please try again later.');
  };
}
