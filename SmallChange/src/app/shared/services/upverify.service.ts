import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';

@Injectable({
  providedIn: 'root',
})
export class UpverifyService {
  private username: String = 'aadrs@gmail.com';
  private password: String = 'ItsASecret101';

  private id: ClientIdentification = new ClientIdentification('SSN', '!@_NM');
  private client: Client = new Client(
    '1234',
    'aadrs@gmail.com',
    '01/01/1990',
    'USA',
    '123456',
    [this.id],
    false
  );

  verifyUSER(username: String, password: String) {
    return this.username === username && this.password === password
      ? this.client
      : false;
  }

  constructor() {}
}
