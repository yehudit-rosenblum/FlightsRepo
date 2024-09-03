import { FligthStatus } from "../enums/fligth-status.enum";

export interface Flight {
    flightNumber: string;
    landingAirport: string;
    takeOffAirport: string;
    status:FligthStatus;
    templateUrlakeOffTime: string;
    landingTime: string;
}