import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../entities/client.entities';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.host}/clients/${id}`);
  }

  deleteClient(c: Client): Observable<void> {
    return this.http.delete<void>(`${this.host}/clients/${c.id}`);
  }

  saveClient(c: Client): Observable<Client> {
    return this.http.post<Client>(`${this.host}/clients/`, c);
  }

  updateClient(c: Client): Observable<Client> {
    return this.http.put<Client>(`${this.host}/clients/${c.id}`, c);
  }

  //TODO: Implement the following methods
  // Additional methods
  getClientsWithGivenName(nom: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.host}/clients/nom=${nom}`);
  }

  getClientsByTriplet(nom: string, prenom: string, tel: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.host}/clients/${nom}/${prenom}/${tel}`);
  }

  //getClientByTaxi(taxiId: number): Observable<Client> {
    // Implement based on your API endpoint structure
    // Example: return this.http.get<Client>(`${this.host}/clients/taxi/${taxiId}`);
   // return null;
  //}
}
