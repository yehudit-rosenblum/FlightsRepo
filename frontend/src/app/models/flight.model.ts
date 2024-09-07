import { FligthStatus } from "../enums/fligth-status.enum";

export interface Flight {
    flightNumber: string;
    landingAirport: string;
    takeOffAirport: string;
    status: FligthStatus;
    takeOffTime: string;
    landingTime: string;
}