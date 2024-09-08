import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlightSearchParams } from '../models/flightSearchParams';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  standalone: true
})
export class FlightSearchComponent {
  serchForm: FormGroup;
  @Output() onSearch = new EventEmitter<FlightSearchParams>();

  constructor(private fb: FormBuilder) {
    this.serchForm = this.fb.group({
      flightNumber: [''],
      takeoff: [''],
    });
  }

  search() {
    debugger;
this.onSearch.emit(this.serchForm.value);
  }
}

