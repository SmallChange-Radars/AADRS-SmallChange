import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvestmentPreferences } from '../models/investment-preferences';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CupreferencesService {
  rTolerances = [
    {
      name: 'CONSERVATIVE',
    },
    {
      name: 'BELOW AVERAGE',
    },
    {
      name: 'AVERAGE',
    },
    {
      name: 'ABOVE AVERAGE',
    },
    {
      name: 'AGGRESIVE',
    },
  ];

  iCategories = [
    {
      name: '0-20,000',
    },
    {
      name: '20,001-40,000',
    },
    {
      name: '40,001-60,000',
    },
    {
      name: '60,001-80,000',
    },
    {
      name: '80,001-100,000',
    },
    {
      name: '100,001-150,000',
    },
    {
      name: '150,000+',
    },
  ];

  iLengths = [
    {
      name: '0-5 years',
    },
    {
      name: '5-7 years',
    },
    {
      name: '7-10 years',
    },
    {
      name: '10-15 years',
    },
  ];
  formInputs: any = [];
  constructor(private http: HttpClient, private user: UserService) {}
  getFormInputs(clientId: string): Observable<any> {
    this.formInputs.push(this.rTolerances, this.iCategories, this.iLengths);
    // if (this.preferenceFilled(clientId)) {
    //   this.formInputs.push('College', 1, 3, 4);
    // }
    let ip!: InvestmentPreferences;
    this.preferenceFilled(clientId).subscribe((data) => (ip = data));
    console.log(ip);
    return of(this.formInputs);
  }

  submitForm(investmentPreferences: InvestmentPreferences): Observable<number> {
    if (
      investmentPreferences.investmentPurpose == '' ||
      investmentPreferences.riskTolerance == '' ||
      investmentPreferences.incomeCategory == '' ||
      investmentPreferences.investmentLength == ''
    )
      return of(0);
    if (this.preferenceFilled(investmentPreferences.clientId)) return of(1);
    else return of(2);
  }

  preferenceFilled(clientId: string): Observable<any> {
    //console.log(this.http.get('http://localhost:8080/client/preferences'));
    // if (clientId == '1') return true;
    // return false;
    let token = this.user.getUser();
    console.log(token);
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.user.getUser()
    );
    return this.http.get('http://localhost:8080/client/preferences', {
      headers: headers,
    });
  }
}
