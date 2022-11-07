import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  

  constructor(private cookieService: CookieService) {
    
  }

  addUser(token: string) {
    this.cookieService.set("accessToken",token);
  }

  removeUser() {
    this.cookieService.delete("accessToken");
  }

  getUser() {
    return this.cookieService.get("accessToken");
  }

  isLoggedIn(): boolean {
    return this.getUser != null;
  }
}
