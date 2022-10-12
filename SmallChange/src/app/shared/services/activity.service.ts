import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Activity } from '../models/activity';
import { UserActivity } from '../models/user-activity';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url="http://localhost:3000/tradeActivity";
  
  constructor(private http: HttpClient,private user:UserService) { }

  getActivityHistory(pageNo: number, pageSize: number, sortDirection: string, sortColumn: string):Observable<HttpResponse<Activity[]>>{
    let url = this.url + '?q=' + 1234 + '&_page=' + pageNo + '&_limit=' + pageSize;
    if (sortDirection === '' || sortColumn === '') {
      return this.http.get<Activity[]>(url, { observe: "response" });
    } else {
      url += "&_sort="+sortColumn+"&_order="+sortDirection;
      return this.http.get<Activity[]>(url, { observe: "response" });
    }
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
