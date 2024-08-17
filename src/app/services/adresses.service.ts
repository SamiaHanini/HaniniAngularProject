import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Adresse } from '../entities/adresse.entities';

@Injectable({ providedIn: 'root' })
export class AdressesService {
  private host = environment.host+"/adresses";

  constructor(private http: HttpClient) {}

  getAdresse(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.host}/${id}`);
  }

  getAdresseByLocalite(localite: string): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.host}/localite/${localite}`);
  }

  getAllAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.host}/all`);
  }

  deleteAdresse(a: Adresse): Observable<void> {
    return this.http.delete<void>(`${this.host}/${a.idadresse}`);
  }

  saveAdresse(a: Adresse): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.host}/create`, a);
  }

  updateAdresse(a: Adresse): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.host}/${a.idadresse}`, a);
  }


}
