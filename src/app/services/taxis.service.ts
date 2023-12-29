import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Taxi } from '../entities/taxi.entities';

@Injectable({ providedIn: 'root' })
export class TaxisService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  getTaxi(id: number): Observable<Taxi> {
    return this.http.get<Taxi>(`${this.host}/taxis/${id}`);
  }

  getAllTaxis(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(this.host + '/taxis/all');
  }

  // searchTaxisByCarburant(carburant: string): Observable<Taxi[]> {
  //   return this.http.get<Taxi[]>(`${this.host}/taxis/carburant/${carburant}`);
  // }

  getTaxisByImmatriculation(immatriculation: string): Observable<Taxi> {
    return this.http.get<Taxi>(`${this.host}/taxis/immatriculation/${immatriculation}`);
  }

  deleteTaxi(t: Taxi): Observable<void> {
    return this.http.delete<void>(`${this.host}/taxis/${t.id}`);
  }

  saveTaxi(t: Taxi): Observable<Taxi> {
    return this.http.post<Taxi>(`${this.host}/taxis/`, t);
  }

  updateTaxi(t: Taxi): Observable<Taxi> {
    return this.http.put<Taxi>(`${this.host}/taxis/${t.id}`, t);
  }
}

