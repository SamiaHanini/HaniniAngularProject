import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../entities/client.entities';
import { LocationEntity } from '../entities/location.entities';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private host = environment.host+"/clients";

  constructor(private http: HttpClient) {}

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.host}/${id}`);
  }


  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.host}/all`);
  }

  deleteClient(c: Client): Observable<void> {
    return this.http.delete<void>(`${this.host}/${c.idclient}`);
  }


  saveClient(c: Client): Observable<Client> {
    return this.http.post<Client>(`${this.host}/create`, c );
  }

  updateClient(c: Client): Observable<Client> {
    return this.http.put<Client>(`${this.host}/${c.idclient}`, c);
  }


  getClientByNomAndPrenomAndTel(nom: string, prenom: string, tel: string): Observable<Client> {
    return this.http.get<Client>(`${this.host}/${nom}/${prenom}/${tel}`);
  }


  getLocationsForClient(id: number): Observable<LocationEntity[]> {
    return this.http.get<LocationEntity[]>(`${this.host}/identifiantloc/${id}`);
  }
}
