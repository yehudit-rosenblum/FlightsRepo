import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { FlightService } from '../flight.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FlightSearchParams } from '../models/flightSearchParams';
import { Flight } from '../models/flight.model';
import { FlightUpdateService } from '../flightUpdate.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FlightSearchComponent,FlightListComponent, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  flights: Flight[] = [];  
  filteredFlights: Flight[] = [];  
  searchParams: FlightSearchParams  = {flightNumber: '' , takeoff: ''};
  destroy$ = new Subject<void>();

  
  constructor(private flightService: FlightService, private flightUpdateService: FlightUpdateService) { }  

  ngOnInit(): void {
    debugger;
    this.loadFlights();  
    this.flightUpdateService.connect().pipe(takeUntil(this.destroy$)).subscribe(update => {
      debugger;
      this.flights = update;  
      this.search(this.searchParams!);
    });
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.flightUpdateService.disconnect();
  }
}

