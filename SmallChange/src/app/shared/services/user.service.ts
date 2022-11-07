import { Injectable } from '@angular/core';
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

  constructor(private cookieService: CookieService) {
    super(initialState);
  }

  addUser(token: string) {
    this.setState({ id: [token] })
    this.cookieService.set("accessToken", token);
  }

  removeUser() {
    this.setState({ id: [] })
    this.cookieService.delete("accessToken");
  }

  getUser() {
    if (this.cookieService.get("accessToken")) {
      console.log("Yes");
      this.setState({ id: [this.cookieService.get("accessToken")] })
    }
    else {
      this.setState({ id: [] })
    }
    return this.state.id[0];
  }

  isLoggedIn(): boolean {
    this.getUser();
    return this.state.id.length != 0;
  }
}
