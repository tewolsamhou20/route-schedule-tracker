import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusStop } from './model/bus-route-info';
//import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import _SampleStopsJson from './../../assets/database.json';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiURL;
  stopsObserved: Observable<BusStop[]> = new Observable();


  constructor(private httpClient: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  public createBusStop(busStop: BusStop) {
    return this.httpClient.post(`${this.apiURL}/Api/busStops`, busStop);
  }

  public updateBusStop(busStop: BusStop) { }

  public deleteBusStop(id: number) { }

  public getBusStopById(id: number) {
    return this.httpClient.get(`${this.apiURL}/Api/busStops/${id}`);
  }

  public getBusStop(url?: string) { }

  public getBusStopList() {
    if (this.apiURL) {

      //return this.httpClient.get<BusStop[]>(`${this.apiURL}/busStops`, { observe: 'response' }).pipe(tap ( res => { this.getBusInfo(res) }));
      return this.httpClient.get<BusStop[]>(`${this.apiURL}/busStops`);
    }
  }

  getBusStopListFake(): Observable<BusStop[]> {
    this.stopsObserved = Observable.create(_SampleStopsJson);
    return Observable.create(this.stopsObserved);
  }

  public getBusInfo(busInfo) {
    return busInfo;
  }
}
