import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,  MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, RouterModule],
  standalone: true
})
export class FlightFormComponent implements OnInit {
  flightForm: FormGroup;
  flightId: string | null = null;

  isSaved: boolean = false;  
  
  constructor( private fb: FormBuilder, private route: ActivatedRoute, private flightService:FlightService){
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      takeOffAirport: ['', Validators.required],
      landingAirport: ['', Validators.required],
      takeoffTime: ['', Validators.required],
      landingTime: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isSaved=false;
    this.flightId = this.route.snapshot.paramMap.get('id');
    if (this.flightId) {
      this.loadFlightDetails(this.flightId);
    }
  }

  loadFlightDetails(id: string) {
    this.flightService.getFlightById(id).subscribe(data => {
      this.flightForm.patchValue({
        flightNumber: data.flightNumber,
        takeoffTime: data.takeoffTime,
        landingTime: data.landingTime,
        status: data.status
      });
    });
  }

  saveFlight() {
    debugger
    this.isSaved=true;
    if (this.flightId) {
      this.flightService.updateFlight(this.flightId, this.flightForm.value).subscribe(
        response => {
      });
    } 
    else {
      this.flightService.createFlight(this.flightForm.value).subscribe(response => {
          console.log('Flight added successfully', response);
        },
        (error) => {
          console.error('Error adding flight:', error);
        }
      );
    }
  }
}
