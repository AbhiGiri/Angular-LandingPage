import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap, pluck, switchMap, toArray, share, tap, catchError, retry } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  url = 'https://api.openweathermap.org/data/2.5/forecast'
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) { }

  getForecast() {
    return this.getCurrentLocation().pipe(
      map(coords => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'matric')
          .set('appid', '9a7d23a340a3896bb7b206197d1fa07e')
      }),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url, {params})),
      pluck('list'),
      mergeMap(value => of(...value)),
      filter((value, index) => index % 8 === 0),
      map(value => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp
        }
      }), toArray(), share()
    );
  }

  getCurrentLocation() {
    return new Observable<any>(observer => {
      console.log("retrying 2 times");

      window.navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        err => observer.error(err)
      )
    }).pipe(
      retry(2),
      tap(() => {
        this.notificationsService.addSuccess('Got your location...');
      },
      catchError(err => {
        // #1. Handle an error
        this.notificationsService.addError("Failed to get you location.");
        // #2. return a new observable
        return throwError(err);
        // 2nd option
        // return new Observable(observer => {
        //   observer.error(err)
        // })
      })
       )
    );
  }
}
