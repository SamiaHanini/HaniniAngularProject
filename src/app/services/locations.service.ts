import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LocationEntity } from '../entities/location.entities';

@Injectable({ providedIn: 'root' })
export class LocationsService {
  private host = environment.host+"/locations";

  constructor(private http: HttpClient) {}

  getLocation(id: number): Observable<LocationEntity> {
    return this.http.get<LocationEntity>(`${this.host}/${id}`);
  }

  getLocationByDate(dateloc: Date): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(`${this.host}/datelocation/${dateloc}`);
  }
  
  getAllLocations(): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(this.host + '/all');
  }

  deleteLocation(l: LocationEntity): Observable<void> {
    return this.http.delete<void>(`${this.host}/${l.idlocation}`);
  }

  saveLocation(l: LocationEntity): Observable<LocationEntity> {
    return this.http.post<LocationEntity>(this.host+'/create', l);
  }

  updateLocation(l: LocationEntity): Observable<LocationEntity> {
    return this.http.put<LocationEntity>(`${this.host}/${l.idlocation}`, l);
  }

  getLocationsForTaxi(taxiId: number): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(`${this.host}/taxi/${taxiId}`);
  }

  getLocationsForClient(clientId: number): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(`${this.host}/client/${clientId}`);
  }

  getLocationsForTaxiInPeriod(taxiId: number, startDate: Date, endDate: Date): Observable<LocationEntity[]>{
    return this.http.get<LocationEntity[]>(`${this.host}/${taxiId}/${startDate}/${endDate}`);
  }
}
