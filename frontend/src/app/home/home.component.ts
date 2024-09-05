import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { FlightService } from '../flight.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FlightSearchComponent,FlightListComponent, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  flights: any[] = [];  

  
  constructor(private flightService: FlightService) { }  

  ngOnInit(): void {
    debugger;
    this.loadFlights();  
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      debugger;
      this.flights = data;  
    });
  }
}
