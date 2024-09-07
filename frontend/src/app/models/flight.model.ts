import { FligthStatus } from "../enums/fligth-status.enum";

export interface Flight {
    flightNumber: string;
    landingAirport: Airport;
    takeOffAirport: Airport;
    status: FligthStatus;
    takeOffTime: string;
    landingTime: string;
}

export interface Airport {
    id: number;
    name: string;
  }
  