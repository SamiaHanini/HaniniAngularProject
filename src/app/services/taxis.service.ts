import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Taxi } from '../entities/taxi.entities';
import { Client } from '../entities/client.entities';
import { LocationEntity } from '../entities/location.entities';

@Injectable({ providedIn: 'root' })
export class TaxisService {
  private host = environment.host+"/taxis";

  constructor(private http: HttpClient) {}
 
  saveTaxi(t: Taxi): Observable<Taxi> {
    return this.http.post<Taxi>(`${this.host}/create`, t );
  }

  getTaxi(id: number): Observable<Taxi> {
    return this.http.get<Taxi>(`${this.host}/${id}`);
  }

  getAllTaxis(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(this.host + '/all');
  }

  getTaxisByImmatriculation(immatriculation: string): Observable<Taxi> {
    return this.http.get<Taxi>(`${this.host}/immatriculation/${immatriculation}`);
  }

  deleteTaxi(t: Taxi): Observable<void> {
    return this.http.delete<void>(`${this.host}/${t.idtaxi}`);
  }

  updateTaxi(t: Taxi): Observable<Taxi> {
    return this.http.put<Taxi>(`${this.host}/${t.idtaxi}`, t);
  }

  getClientsForTaxi(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.host}/identifiant/${id}`);
  }

  getLocationsForTaxi(id: number): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(`${this.host}/identifiantloc/${id}`);
  }

  
  getKmTotal(taxiIds: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${this.host}/identifiantkmtot`, taxiIds);
  }

  getMontantTotal(taxiIds: number[]): Observable<number[]> {
    return this.http.post<number[]>(`${this.host}/identifiantmontant`, taxiIds);
  }
 
}

