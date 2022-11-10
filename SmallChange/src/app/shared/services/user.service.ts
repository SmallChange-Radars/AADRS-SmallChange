import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface accessToken {
  id: string[]
}

const initialState: accessToken = {
  id: []
};


@Injectable({
  providedIn: 'root'
})
export class UserService extends StateService<accessToken>{

  accessToken$: Observable<string[]> = this.select(state => state.id);
  public redirectUrl: string | null = null;

  constructor(private cookieService: CookieService, private router: Router) {
    super(initialState);
  }

  addUser(token: string) {
    this.setState({ id: [token] })
    this.cookieService.set("accessToken", token);
    console.log(this.redirectUrl);
    if (this.redirectUrl != null) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
    else {
      this.router.navigate(["/home"]);
    }
  }

  redirect() {
    this.router.navigate(["/"]);
  }

  removeUser() {
    this.setState({ id: [] })
    this.cookieService.delete("accessToken");
    if (this.redirectUrl != null) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
    else {
      this.router.navigate(["/"]);
    }
  }

  getUser() {
    if (this.state.id.length == 0) {
      if (this.cookieService.get("accessToken") != "")
        this.setState({ id: [this.cookieService.get("accessToken")] })
      else
        this.setState({ id: [] })
    }
    return this.state.id[0];
  }

  isLoggedIn(): boolean {
    try {
      this.getUser();
    }
    catch (err) {
      return false;
    }
    return this.state.id.length != 0;
  }
}
