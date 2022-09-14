import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  user: any;

  constructor(private http: HttpClient) {
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
      let valid = false;
      if (!control.value) {
        return null;
      }
      if(control.value == "aadrs@gmail.com" || control.value== "john@gmail.com" || control.value == "jane@yahoo.com"){
        valid = true;
      }
      return valid ? { EmailExists: true } : null;
    };
  }

  getUsers(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/userDetails?email=' + email);
  }

  pushUser(user: any): Observable<any> {
    return this.http.put('http://localhost:3000/userDetails', user);
  }

}
