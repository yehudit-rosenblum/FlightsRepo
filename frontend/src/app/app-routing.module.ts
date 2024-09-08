import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'flights', component: FlightListComponent },
  { path: 'create-flight', component: FlightFormComponent },
  { path: 'edit-flight/:id', component: FlightFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
