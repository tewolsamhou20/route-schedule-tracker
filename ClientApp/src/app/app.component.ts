import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/server-api.service';
import { HttpClient } from '@angular/common/http';
//import { timer } from 'rxjs/observable/timer';
import { concatMap, map, tap, switchMap, merge, delay, skip } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
//import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { concat } from 'rxjs/internal/observable/concat';
import { of } from 'rxjs/internal/observable/of';
import { BusStop } from './services/model/bus-route-info';
import { Subscription } from 'rxjs/internal/Subscription';
import { ScheduleComponent } from './forms/schedule.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //href="{{}}" > {{}}
  // ..Bus stop Data: {{ polledBusRoutes$ | async }}
  //template: `
  //  <button (click)='refreshRouteDataApi()'>  Refresh data</button>
  //  <div class="text-center">
  //    <p class="lead" *ngIf="loading">Loading...</p>
  //  </div>
  //  <ul class="list-group">
  //    <li class="list-group-item"
  //        *ngFor="let stop of stopsObserved | async">
  //    </li>
  //  </ul>
  //`,
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly apiURL; // string = 'http://localhost:3000';
  title = 'Bus Route Inspector';
  polledBusRoutes$: Observable<any>;
  stopsObserved: Observable<BusStop[]> = new Observable();
  stopList: BusStop[];
  load$ = new BehaviorSubject('');

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  ngOnInit() {
    const busRoutes$ = this.http.get(`${this.apiURL}/busStops`);

    const routeRefresh$ = of('').pipe(
      delay(900000),
      tap(_ => this.load$.next('')),
      skip(1),
    );

    const poll$ = concat(busRoutes$, routeRefresh$);

    this.polledBusRoutes$ = this.load$.pipe(
      concatMap(_ => poll$)
    );
  }


  refreshRouteData() {
    this.load$.next('');

  }

  refreshRouteDataApi() {

    this.apiService.getBusStopListFake().pipe(data =>
      (this.stopsObserved = data)
    );
  }
}
