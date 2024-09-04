import { Component } from '@angular/core';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public flightService:FlightService){
    this.flightService.connect();
  }
  title = 'flight-management';
}
