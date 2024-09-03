import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  imports:[CommonModule, MatTableModule,
    MatButtonModule],
  standalone:true
})
export class FlightListComponent {
  @Input() flights: any[] = [];
  displayedColumns: string[] = ['flightNumber', 'takeOffAirport', 'landingAirport', 'status', 'takeOffTime', 'landingTime', 'edit'];

  editFlight(id:number){

  }
}
