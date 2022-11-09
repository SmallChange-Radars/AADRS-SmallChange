import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Activity } from '../models/activity';
import { UserActivity } from '../models/user-activity';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url="http://localhost:8080/api/tradeActivity";
  
  constructor(private http: HttpClient,private user:UserService) { }

  getActivityHistory(searchString: string, category: string,sortColumn: string,sortDirection: string, pageNo: number, pageSize: number ):Observable<HttpResponse<Activity[]>>{
    let url = this.url + '?q=' + searchString+ '&_category=' + category+ '&_sort=' + sortColumn+ '&_order=' + sortDirection + '&_page=' + pageNo + '&_limit=' + pageSize;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    
      return this.http.get<Activity[]>(url, {headers: headers, observe: "response" });
    
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
