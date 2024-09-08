import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightUpdateService {
  private socket: WebSocket | undefined;
  private subject: Subject<any>;

  private wsUrl = 'wss://localhost:44362/ws';
  

  constructor() {
    this.subject = new Subject<any>();
  }

  connect(): Observable<any> {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.subject.next(data);
    };

    return this.subject.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
