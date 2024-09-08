import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Flight } from '../models/flight.model';
import { Router } from '@angular/router';
import { FligthStatus } from '../enums/fligth-status.enum';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  imports: [CommonModule, MatTableModule,
    MatButtonModule],
  standalone: true
})
export class FlightListComponent {
  constructor(private route: Router) {

  }
  @Input() flights: Flight[] = [];
  displayedColumns: string[] = ['flightNumber', 'takeOffAirport', 'landingAirport', 'status', 'takeOffTime', 'landingTime', 'edit'];

  editFlight(flight: Flight) {
    debugger
    this.route.navigateByUrl('/edit-flight/' + flight.flightNumber)
  }
  getStatusLabel(status: FligthStatus): string {
    switch (status) {
      case FligthStatus.hanger:
        return 'Hanger';
      case FligthStatus.airborne:
        return 'Airborne';
      case FligthStatus.malfunction:
        return 'Malfunction';
      default:
        return 'Unknown';
    }
}
}
