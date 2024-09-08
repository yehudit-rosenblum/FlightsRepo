import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { FlightService } from '../flight.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FlightSearchParams } from '../models/flightSearchParams';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FlightSearchComponent,FlightListComponent, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  flights: Flight[] = [];  
  filteredFlights: Flight[] = [];  

  
  constructor(private flightService: FlightService) { }  

  ngOnInit(): void {
    debugger;
    this.loadFlights();  
  }

  search(params: FlightSearchParams){
    debugger
    this.filteredFlights = [...this.flights];
    if(params.flightNumber && params.flightNumber != '')
    this.filteredFlights = this.filteredFlights.filter(f => f.flightNumber.startsWith(params.flightNumber));
    if(params.takeoff && params.takeoff != '')
      this.filteredFlights = this.filteredFlights.filter(f => f.takeOffAirport.name.startsWith(params.takeoff) || f.landingAirport.name.startsWith(params.takeoff));

  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      debugger;
      this.flights = data;  
      this.filteredFlights = [...data];
    });
  }
}

