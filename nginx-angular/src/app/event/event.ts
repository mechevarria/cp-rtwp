import { Point } from 'mapbox-gl';

export class Event {
  eventId: string;
  eventDate: Date;
  eventType: string;
  actor1: string;
  actor2: string;
  countryName: string;
  fatalities: number;
  geoLocation: Point;
  notes: string;
}
