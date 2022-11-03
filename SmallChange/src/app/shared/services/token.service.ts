import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  postUserLogin(user: Login ):Observable<Token>{
    const url = "http://localhost:8080/api/auth/signin";
      return this.http.post<Token>(url,user);
  }
}
