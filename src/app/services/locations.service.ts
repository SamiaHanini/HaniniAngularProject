import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Location } from '../entities/location.entities';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.host}/locations/${id}`);
  }

  deleteLocation(l: Location): Observable<void> {
    return this.http.delete<void>(`${this.host}/locations/${l.id}`);
  }

  saveLocation(l: Location): Observable<Location> {
    return this.http.post<Location>(`${this.host}/locations/`, l);
  }

  updateLocation(l: Location): Observable<Location> {
    return this.http.put<Location>(`${this.host}/locations/${l.id}`, l);
  }

  //TODO: Implement the following methods
  // Additional methods
  getLocationsForTaxi(taxiId: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.host}/locations/taxi/${taxiId}`);
  }

  getLocationsForClient(clientId: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.host}/locations/client/${clientId}`);
  }

  getLocationsForTaxiInPeriod(startDate: Date, endDate: Date, taxiId: number): Observable<Location[]> | null {
    // Implement based on your API endpoint structure
    // Example: return this.http.get<Location[]>(`${this.host}/locations/taxi/${taxiId}/period?start=${startDate}&end=${endDate}`);
    return null;
  }
}
