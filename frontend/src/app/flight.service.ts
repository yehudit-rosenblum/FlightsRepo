import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Flight } from './models/flight.model';
import { FligthStatus } from './enums/fligth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flightSub=new Subject<Flight>();
  private apiUrl = 'https://localhost:44362/api/Flight'; 

  constructor(private http: HttpClient) { }

  // פונקציה לקבלת כל הטיסות
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/GetFlights`);
  }
  



  // פונקציה לקבלת טיסה לפי מזהה
  getFlightById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // פונקציה ליצירת טיסה חדשה
  // createFlight(flightData: any): Observable<any> {
  //   debugger
  //   return this.http.post(`${this.apiUrl}/Add`, flightData);
  // }

  createFlight(flightData: Flight): Observable<Flight> {
    debugger
    return this.http.post<Flight>(`${this.apiUrl}/Add`, flightData);
  }
  
  // פונקציה לעדכון טיסה קיימת
  updateFlight(id: string, flightData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, flightData);
  }


  //  socket!: WebSocket;


  connect(): void {
    // this.socket = new WebSocket('ws://localhost:5000/ws');

    // this.socket.onopen = (event) => {
    //   console.log('WebSocket connection opened:', event);
    // };

    // this.socket.onmessage = (event) => {
    //   console.log('Message received from server:', event.data);
    //   this.flightSub.next()
    // };

  //   this.socket.onclose = (event) => {
  //     console.log('WebSocket connection closed:', event);
  //   };

  //   this.socket.onerror = (event) => {
  //     console.error('WebSocket error:', event);
  //   };
  }
}
