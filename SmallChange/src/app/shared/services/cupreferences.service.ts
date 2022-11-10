import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvestmentPreferences } from '../models/investment-preferences';
import { UserService } from './user.service';

enum rTolerancesValues {
  'CONSERVATIVE',
  'BELOW AVERAGE',
  'AVERAGE',
  'ABOVE AVERAGE',
  'AGGRESIVE',
}

enum iCategoriesValues {
  '0-20,000',
  '20,001-40,000',
  '40,001-60,000',
  '60,001-80,000',
  '80,001-100,000',
  '100,001-150,000',
  '150,000+',
}

enum iLengthsValues {
  '0-5 years',
  '5-7 years',
  '7-10 years',
  '10-15 years',
}
@Injectable({
  providedIn: 'root',
})
export class CupreferencesService {
  formInputs: any = [];
  constructor(private http: HttpClient, private user: UserService) {}
  getFormInputs(): Observable<any> {
    this.formInputs.push(
      Object.keys(rTolerancesValues).filter((v) => isNaN(Number(v))),
      Object.keys(iCategoriesValues).filter((v) => isNaN(Number(v))),
      Object.keys(iLengthsValues).filter((v) => isNaN(Number(v)))
    );
    return of(this.formInputs);
  }

  submitForm(
    investmentPreferences: InvestmentPreferences,
    formFilled: boolean,
    checkbox: boolean
  ): Observable<any> {
    if (
      investmentPreferences.investmentPurpose == '' ||
      investmentPreferences.riskTolerance == '' ||
      investmentPreferences.incomeCategory == '' ||
      investmentPreferences.lengthOfInvestment == '' ||
      checkbox == false
    )
      return of(0);
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    if (!formFilled)
      return this.http.post(
        'http://localhost:8080/api/client/preferences',
        investmentPreferences,
        {
          headers: headers,
        }
      );
    return this.http.put(
      'http://localhost:8080/api/client/preferences',
      investmentPreferences,
      {
        headers: headers,
      }
    );
  }

  preferenceFilled(): Observable<any> {
    let token = this.user.getUser();
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.user.getUser())
      .set('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/client/preferences', {
      headers: headers,
    });
  }
}
