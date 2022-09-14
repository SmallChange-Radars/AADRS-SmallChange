import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface clientId {
  id: string[]
}

const initialState: clientId = {
  id: []
};

@Injectable({
  providedIn: 'root'
})
export class UserService extends StateService<clientId>{

  clientId$: Observable<string[]> = this.select(state => state.id);

  constructor() {
    super(initialState);
  }

  addUser(id: string) {
    this.setState({ id: [id] })
  }

  removeUser(id: string) {
    this.setState({ id: [] })
  }

  getUser() {
    return this.state.id[0];
  }

  isLoggedIn(): boolean {
    return this.state.id.length != 0;
  }
}
