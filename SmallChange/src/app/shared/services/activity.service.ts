import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  mockActivityHistory: Activity[] = [
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    },
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    },
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    },
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    },
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    },
    {
      "stock":{
        "name":"Fidelity Investments",
        "symbol":"SQ",
        "market":"NYSE",
        "priceArray":[1,2,3,4],
        "volume":30
      },
      "price":11,
      "quantity":20,
      "time": new Date().toDateString(),
      "typeOfTransaction":"Buy"
    }
  ]
  
  constructor(private http: HttpClient) { }

  getActivityHistory():Observable<Activity[]>{
    return of(this.mockActivityHistory);
  }
}
