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
  private apiUrl = 'https://your-backend-api.com/flights'; // שנה את ה-URL לכתובת ה-API שלך

  constructor(private http: HttpClient) { }

  // פונקציה לקבלת כל הטיסות
  getFlights():  Observable<Flight[]> {
    const flights: Flight[] = [
      {
        flightNumber: 'LY001',
        landingAirport: 'JFK',
        takeOffAirport: 'TLV',
        status: FligthStatus.airborne,
        templateUrlakeOffTime: '2024-09-03T15:00:00',
        landingTime: '2024-09-03T20:00:00'
      },
      {
        flightNumber: 'BA098',
        landingAirport: 'LHR',
        takeOffAirport: 'JFK',
        status: FligthStatus.hanger,
        templateUrlakeOffTime: '2024-09-03T17:30:00',
        landingTime: '2024-09-04T07:30:00'
      },
      {
        flightNumber: 'AF456',
        landingAirport: 'CDG',
        takeOffAirport: 'TLV',
        status: FligthStatus.malfunction,
        templateUrlakeOffTime: '2024-09-03T12:00:00',
        landingTime: '2024-09-03T16:00:00'
      }
    ];

    return of(flights);
    //return this.http.get(`${this.apiUrl}`);
  }



  // פונקציה לקבלת טיסה לפי מזהה
  getFlightById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // פונקציה ליצירת טיסה חדשה
  createFlight(flightData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, flightData);
  }

  // פונקציה לעדכון טיסה קיימת
  updateFlight(id: string, flightData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, flightData);
  }

  // פונקציה למחיקת טיסה
  deleteFlight(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

   socket!: WebSocket;


  connect(): void {
    this.socket = new WebSocket('ws://localhost:5000/ws');

    this.socket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
    };

    // this.socket.onmessage = (event) => {
    //   console.log('Message received from server:', event.data);
    //   this.flightSub.next()
    // };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }
}
