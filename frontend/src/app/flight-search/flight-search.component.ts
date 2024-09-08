import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  standalone: true
})
export class FlightSearchComponent {
  serchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serchForm = this.fb.group({
      flightNumber: [''],
      takeoff: [''],
    });
  }

  search() {

    
  }
}
