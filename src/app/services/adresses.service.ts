import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Adresse } from '../entities/adresse.entities';

@Injectable({ providedIn: 'root' })
export class AdressesService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  getAdresse(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.host}/adresses/${id}`);
  }

  searchAdresseByLocality(localite: string): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.host}/adresses/localite/${localite}`);
  }

  deleteAdresse(a: Adresse): Observable<void> {
    return this.http.delete<void>(`${this.host}/adresses/${a.id}`);
  }

  saveAdresse(a: Adresse): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.host}/adresses/`, a);
  }

  updateAdresse(a: Adresse): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.host}/adresses/${a.id}`, a);
  }
}
