import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpverifyService {

  private username: String="a000007@fmr.com";
  private password: String="ItsASecret101";

  verifyUSER(username:String,password:String): Boolean {
    return this.username===username && this.password===password;
  }

  constructor() { }
}
