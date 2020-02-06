import { Component } from '@angular/core';
import { interval, of, Observable, from, pipe } from 'rxjs';
import { take, map, filter, reduce, delay, throttleTime, share, shareReplay } from 'rxjs/operators';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs-training';
  source = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
  observable = of(1).pipe(delay(3000))
  

  ngOnInit(dataServiceService: DataServiceService) {
    this.sumWithObservables(this.source)
    //dataServiceService.getOrderedNumbersDelayed(100).subscribe(x => console.log(x))
    // let observable = of('Hello world', 1, [], {'name': 'Jan'})
    // observable.subscribe(console.log)
  }

  sumWithForLoop(source: any[]){
    let result = 0;
    for (let i = 0; i < source.length; i++) {
      let parsed = parseInt(source[i]);
      if (!isNaN(parsed)) {
        result += parsed;
      }
    }
    console.log(result); 
  }

  sumWithHigherOrderFunctions(source: any[]){
    let result = source
      .map(x => parseInt(x))
      .filter(x => !isNaN(x))
      .reduce((x, y) => x+y);
    console.log(result);
  }

  sumWithObservables(source: any[]){
    let observableSource = of(...source)
    //let observableSource = interval(400).pipe(take(9)).pipe(map(i => source[i]))

    let result = observableSource
      .pipe(map(x => parseInt(x)))
      .pipe(filter(x => !isNaN(x)))
      .pipe(reduce((x,y) => x+y))

    result.subscribe(x => console.log(x));
  }

  getOrderedNumbers(numberTo : number) : Observable<number> {
    return from([...Array(numberTo).keys()])
  }

  getOrderedNumbersDelayed(numberTo : number) : Observable<number> {
    return from([...Array(numberTo).keys()]).pipe(delay(4000))
  }

  hotObservable(numberTo : number) : Observable<string> {
    return interval(1000)
      .pipe(take(10))
      .pipe(map(x => x+1))
      .pipe(share())
      .pipe(map(x => ''+ x))
  }

  callHotObservable() {
    this.hotObservable(100).subscribe(x => console.log(`Pierwszy subscribe ${x}`))
    setTimeout(() => this.hotObservable(100).subscribe(x => console.log(`Drugi subscribe ${x}`)), 5000)
  }

  coldObservable(numberTo : number) : Observable<string> {
    return interval(1000)
      .pipe(take(10))
      .pipe(map(x => x+1))
      .pipe(shareReplay())
      .pipe(map(x => ''+ x))
  }

  callColdObservable() {
    this.coldObservable(100).subscribe(x => console.log(`Pierwszy subscribe ${x}`))
    setTimeout(() => this.coldObservable(100).subscribe(x => console.log(`Drugi subscribe ${x}`)), 5000)
  }

  cancelSubscription() {
    let subscription = this.getOrderedNumbersDelayed(100).subscribe(console.log)
    setTimeout(()=>subscription.unsubscribe(),500)
  }

}
