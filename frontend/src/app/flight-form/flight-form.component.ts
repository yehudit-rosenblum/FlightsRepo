// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { FlightService } from '../flight.service';
// import { CommonModule, NgFor } from '@angular/common';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { RouterModule } from '@angular/router';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { Airport } from '../models/flight.model';
// import { map, Observable, startWith } from 'rxjs';


// @Component({
//   selector: 'app-flight-form',
//   templateUrl: './flight-form.component.html',
//   styleUrls: ['./flight-form.component.scss'],
//   imports: [CommonModule, ReactiveFormsModule,  MatInputModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatNativeDateModule, RouterModule, MatAutocompleteModule, FormsModule,   NgFor],
//   standalone: true
// })
// export class FlightFormComponent implements OnInit {
//   flightForm: FormGroup;
//   flightId: string | null = null;
//   airports: Airport[] = [];
//   isSaved: boolean = false;  
//   filteredAirports$: Observable<Airport[]> | undefined = new Observable();
//   landFilteredAirports$: Observable<Airport[]> | undefined = new Observable(); 
  
//   constructor( private fb: FormBuilder, private route: ActivatedRoute, private flightService:FlightService){
//     this.flightForm = this.fb.group({
//       flightNumber: ['', Validators.required],
//       takeOffAirport: ['', Validators.required],
//       landingAirport: ['', Validators.required],
//       takeoffTime: ['', Validators.required],
//       landingTime: ['', Validators.required],
//       status: ['', Validators.required]
//     });
    
//     this.filteredAirports$ = this.flightForm.get('takeOffAirport')?.valueChanges.pipe(
//       startWith(''),
//       map(airport => (airport ? this.filterAirports(airport) : this.airports.slice())),
//     );

//     this.landFilteredAirports$ = this.flightForm.get('landingAirport')?.valueChanges.pipe(
//       startWith(''),
//       map(airport => (airport ? this.filterAirports(airport) : this.airports.slice())),
//     );
//   }

//   ngOnInit(): void {
//     debugger
    

//     //מקבל את כל השדות תעופה
//     this.flightService.getAirPorts().subscribe(
//       res =>  this.airports = res);

//       //כפתור שמירה דלוק
//     this.isSaved=false;

//   //לוקח את ה id
//     this.flightId = this.route.snapshot.paramMap.get('id');
//     //אם אכן הגיע
//     if (this.flightId) {
//         this.loadFlightDetails(this.flightId);
//         this.flightForm.get('flightNumber')?.clearValidators();
//         this.flightForm.get('flightNumber')?.updateValueAndValidity();
//     }

    
//   }
  
  

  
//   loadFlightDetails(id: string) {
//     this.flightService.getFlightById(id).subscribe(data => {
//       this.flightForm.patchValue({
//         flightNumber: data.flightNumber,
//         takeoffTime: data.takeoffTime,
//         landingTime: data.landingTime,
//         status: data.status
//       });
//     });
//   }

//   saveFlight() {
//     debugger
//     this.isSaved=true;
//     if (this.flightId) {
//       this.flightService.updateFlight(this.flightId, this.flightForm.value).subscribe(
//         response => {
//       });
//     } 
//     else {
//       this.flightService.createFlight(this.flightForm.value).subscribe(response => {
//           console.log('Flight added successfully', response);
//         },
//         (error) => {
//           console.error('Error adding flight:', error);
//         }
//       );
//     }
//   }

//   public get takeOffReportsControl() : FormControl {
//     return <FormControl>this.flightForm.get('takeOffAirport');
//   }
  
//   public get landingReportsControl() : FormControl {
//     return <FormControl>this.flightForm.get('landingAirport');
//   }

//   filterAirports(value: string | Airport): Airport[] {
//     let filterValue: string = '';
    
//     // בדיקה שהערך הוא מחרוזת לפני השימוש ב-toLowerCase
//     if (typeof value === 'string') {
//       filterValue = value.toLowerCase();
//     } else if (typeof value === 'object' && value !== null) {
//       filterValue = value.name.toLowerCase();
//     }
  
//     return this.airports.filter(airport => airport.name?.toLowerCase().includes(filterValue));
//   }

//   displayAirport(airport: Airport): string {
//     return airport ? airport.name : '';
//   }
// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Airport, Flight } from '../models/flight.model';
import { map, Observable, startWith, Subject, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    MatAutocompleteModule,
    FormsModule,
    NgFor
  ],
  standalone: true
})
export class FlightFormComponent implements OnInit , OnDestroy {
  flightForm: FormGroup;
  flightId: string | null = null;
  airports: Airport[] = [];
  isSaved: boolean = false;
  filteredAirports$: Observable<Airport[]> | undefined = new Observable();
  landFilteredAirports$: Observable<Airport[]> | undefined = new Observable();
  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private flightService: FlightService) {
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      takeOffAirport: ['', Validators.required],
      landingAirport: ['', Validators.required],
      takeoffTime: ['', Validators.required],
      landingTime: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.filteredAirports$ = this.flightForm.get('takeOffAirport')?.valueChanges.pipe(
      startWith(''),
      map(airport => (airport ? this.filterAirports(airport) : this.airports.slice()))
    );

    // עדכון שדה הנחיתה כדי לוודא שהשדה שנבחר בהמראה לא יופיע כאן
    this.flightForm.get('takeOffAirport')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((selectedAirport: Airport | null) => {
      if (selectedAirport && selectedAirport.name) {
        this.landFilteredAirports$ = this.filteredAirports$?.pipe(
          map(airports => airports.filter(airport => airport.name !== selectedAirport.name))
        );
      } else {
        this.landFilteredAirports$ = this.filteredAirports$;
      }
    });
  }

  ngOnInit(): void {
    debugger;
    // מקבל את כל שדות התעופה
    this.flightService.getAirPorts().subscribe(
      res => this.airports = res
    );

    // כפתור שמירה דלוק
    this.isSaved = false;

    // לוקח את ה-id
    this.flightId = this.route.snapshot.paramMap.get('id');
    // אם אכן הגיע
    if (this.flightId) {
      this.loadFlightDetails(this.flightId);
      this.flightForm.get('flightNumber')?.clearValidators();
      this.flightForm.get('flightNumber')?.updateValueAndValidity();
    }
  }

  loadFlightDetails(id: string) {
    this.flightService.getFlightById(id).subscribe((data: Flight) => {
      this.flightForm.patchValue({
        flightNumber: data.flightNumber,
        takeoffTime: data.takeOffTime,
        landingTime: data.landingTime,
        takeOffAirport: data.takeOffAirport,
        landingAirport: data.landingAirport,

        status: data.status
      });
    });
  }

  saveFlight() {
    this.isSaved = true;
    if (this.flightId) {
      this.flightService.updateFlight(this.flightId, this.flightForm.value).subscribe();
    } else {
      this.flightService.createFlight(this.flightForm.value).subscribe(
        response => {
          console.log('Flight added successfully', response);
        },
        error => {
          console.error('Error adding flight:', error);
        }
      );
    }
  }

  public get takeOffReportsControl(): FormControl {
    return <FormControl>this.flightForm.get('takeOffAirport');
  }

  public get landingReportsControl(): FormControl {
    return <FormControl>this.flightForm.get('landingAirport');
  }

  filterAirports(value: string | Airport): Airport[] {
    let filterValue = '';
    
    // בדיקה שהערך הוא מחרוזת לפני השימוש ב-toLowerCase
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'object' && value !== null) {
      filterValue = value.name.toLowerCase();
    }

    return this.airports.filter(airport => airport.name?.toLowerCase().includes(filterValue));
  }

  displayAirport(airport: Airport): string {
    return airport ? airport.name : '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }
}
