import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  getOrderedNumbers(numberTo : number) : Observable<number> {
    return of(...[...Array(numberTo).keys()])
  }

  getOrderedNumbersDelayed(numberTo : number) : Observable<number> {
    return of(...[...Array(numberTo).keys()]).pipe(delay(100))
  }
}
