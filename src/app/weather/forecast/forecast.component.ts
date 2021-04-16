import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  // forecastData = [];
  forecast$: Observable<{temp: number, dateString: string}[]>

  constructor(
    private forecastService: ForecastService
  ) {
    this.forecast$ = this.forecastService.getForecast();

  }

  ngOnInit(): void {
  }

}
