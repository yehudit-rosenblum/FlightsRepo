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
  flights: any[] = [];  // משתנה לאחסון רשימת הטיסות

  
  constructor(private flightService: FlightService) { }  // הזרקת השירות

  ngOnInit(): void {
    this.loadFlights();  // קריאה לטעינת הטיסות עם העלאת הרכיב
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      this.flights = data;  // שמירת הנתונים שהתקבלו בשירות במשתנה
    });
  }
}
